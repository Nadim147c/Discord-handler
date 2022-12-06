import { Collection, inlineCode } from "discord.js"
import { commandTimeout, developers, testers } from "../../config"
import { interactionRepliers } from "../../functions/discord/repliers"
import { logError } from "../../functions/log/logger"
import Event from "../../structures/Event"
import { ExtendedCommand } from "../../typings/Commands"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = interaction as ExtendedCommand

    Object.assign(command, interactionRepliers)

    const { options, client, member, user, commandName } = command

    const group = options.getSubcommandGroup(false)
    const sub = options.getSubcommand(false)

    const keys = [commandName, group, sub].filter((x) => !!x)
    const key = keys.join("-")

    const module = client.commands.get(key)

    if (!module) return command.error("oops! There is an error.")

    if (module.dev && !developers.includes(user.id)) return command.error("Only developers can use this command.")
    if (module.beta && !developers.includes(user.id) && !testers.includes(user.id))
        return command.error("Only developers and beta testers can use this command.")

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        return command.warn(`You need following permissions to use this command.\n${permissions}`)
    }

    const timeout = client.commandTimeout

    if (!timeout.has(key)) timeout.set(key, new Collection())

    const now = new Date().valueOf()
    const timestamps = timeout.get(key)
    const coolDownAmount = module.timeout ?? commandTimeout

    if (timestamps.has(user.id)) {
        const expirationTime = timestamps.get(user.id) + coolDownAmount

        if (now < expirationTime || testers.includes(user.id) || developers.includes(user.id)) {
            const timeLeft = `<t:${Math.round(expirationTime / 1000)}:R>`
            const content = `Slow down buddy! You can use \`${keys.join(" ")}\` command **${timeLeft}**.`
            return command.response(content)
        }
    }

    timestamps.set(user.id, now)
    setTimeout(() => timestamps.delete(user.id), coolDownAmount)

    if (module.deffer || module.ephemeral)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        module.ephemeral ? await command.deferReply({ ephemeral: true }) : await command.deferReply()

    try {
        module.run(command)
    } catch (error) {
        logError(error)
    }
})
