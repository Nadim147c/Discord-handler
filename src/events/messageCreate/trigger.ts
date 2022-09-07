import { EmbedBuilder, Message } from "discord.js"
import { colors } from "../../config"
import { Event } from "../../structures/Event"
import { ExtendedMessage } from "../../typings/Triggers"

export default new Event("messageCreate", async (message: ExtendedMessage) => {
    if (!message.inGuild()) return

    const { client, content } = message

    message.response = async function (content, replyMention = false, time) {
        const embeds = [new EmbedBuilder().setColor(colors.default).setDescription(content)]
        const message: Message<true> = await this.reply({ embeds, allowedMentions: { repliedUser: replyMention } })
        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    }

    message.warn = async function (content, replyMention = false, time) {
        const embeds = [new EmbedBuilder().setColor(colors.warn).setDescription(content)]
        const message: Message<true> = await this.reply({ embeds, allowedMentions: { repliedUser: replyMention } })
        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    }

    message.error = async function (content, replyMention = false, time) {
        const embeds = [new EmbedBuilder().setColor(colors.error).setDescription(content)]
        const message: Message<true> = await this.reply({ embeds, allowedMentions: { repliedUser: replyMention } })
        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    }

    const trigger = client.triggers.message

    trigger.forEach((trigger, key) => {
        if (content.match(new RegExp(key, "gi"))) trigger.run(message)
    })
})
