import { Collection, EmbedBuilder, inlineCode, Message } from "discord.js"
import { colors, commandTimeout, developers, testers } from "../../../config"
import { Event } from "../../../structures/Event"
import { ExtendedCommand } from "../../../typings/Commands"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = interaction as ExtendedCommand

    command.response = async function (content, ephemeral = true, time) {
        const embeds = [new EmbedBuilder().setColor(colors.default).setDescription(content)]
        let message: Message

        try {
            message = this.deferred
                ? await this.followUp({ embeds, ephemeral })
                : await this.reply({ embeds, ephemeral, fetchReply: true })
        } catch (error) {
            message = (await this.editReply({ embeds })) as Message
        }

        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    }

    command.warn = async function (content, ephemeral = true, time) {
        const embeds = [new EmbedBuilder().setColor(colors.warn).setDescription(content)]
        let message: Message

        try {
            message = this.deferred
                ? await this.followUp({ embeds, ephemeral })
                : await this.reply({ embeds, ephemeral, fetchReply: true })
        } catch (error) {
            message = (await this.editReply({ embeds })) as Message
        }

        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    }

    command.error = async function (content, ephemeral = true, time) {
        const embeds = [new EmbedBuilder().setColor(colors.error).setDescription(content)]
        let message: Message

        try {
            message = this.deferred
                ? await this.followUp({ embeds, ephemeral })
                : await this.reply({ embeds, ephemeral, fetchReply: true })
        } catch (error) {
            message = (await this.editReply({ embeds })) as Message
        }

        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    }

    const { options, client, member, user } = command

    const commandName = command.commandName
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
        return command.warn(`You need following permissions to use this commands.\n${permissions}`)
    }

    const { commandTimeout: timeout } = client

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
        module.ephemeral ? await command.deferReply({ ephemeral: true }) : await command.deferReply()

    try {
        module.run(command)
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
    }
})
