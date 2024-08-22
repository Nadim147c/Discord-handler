import { Collection, inlineCode } from "discord.js"
import { getDynamicTime } from "../../functions/discord/getDynamicTime.js"
import { logError } from "../../functions/log/logger.js"
import Event from "../../structures/Event.js"
import type { CommandType, ExtendedCommand } from "../../typings/Commands.js"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = interaction as unknown as ExtendedCommand

    const { options, client, member, user, commandName } = command

    const group = options.getSubcommandGroup(false)
    const sub = options.getSubcommand(false)

    const keys = [commandName, group, sub].filter((x) => !!x)
    const key = keys.join("-")

    const module = client.commands.get(key) as CommandType

    if (!module) return await command.reply("oops! There is an error.")

    const { developers, testers, commandTimeout } = globalThis.config

    if (module.dev && !developers.includes(user.id))
        return await command.reply("Only developers can use this command.")
    if (module.beta && !developers.includes(user.id) && !testers.includes(user.id))
        return await command.reply("Only developers and beta testers can use this command.")

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        return await command.reply(
            `You need following permissions to use this command.\n${permissions}`
        )
    }

    const timeout = client.commandTimeout

    if (!timeout.has(key)) timeout.set(key, new Collection())
    // biome-ignore lint/style/noNonNullAssertion: Timestamp already has be checked and set
    const timestamps = timeout.get(key)!

    const now = new Date().valueOf()
    const coolDownAmount = module.timeout ?? commandTimeout

    if (timestamps.has(user.id)) {
        const expirationTime = (timestamps.get(user.id) ?? 0) + coolDownAmount

        if (now < expirationTime || testers.includes(user.id) || developers.includes(user.id)) {
            const timeLeft = getDynamicTime(expirationTime, "RELATIVE")
            const content = `Slow down buddy! You can use \`${keys.join(" ")}\` command **${timeLeft}**.`
            return await command.reply(content)
        }
    }

    timestamps.set(user.id, now)
    setTimeout(() => timestamps.delete(user.id), coolDownAmount)

    if (module.ephemeral) {
        await command.deferReply({ ephemeral: true })
    } else if (module.deffer) {
        await command.deferReply()
    }

    try {
        module.run(command)
    } catch (error) {
        logError(error)
    }
})
