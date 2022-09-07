import { EmbedBuilder, Message } from "discord.js"
import { colors } from "../../config"
import { Event } from "../../structures/Event"
import { ExtendedReaction } from "../../typings/Triggers"

export default new Event("messageReactionAdd", async (reaction: ExtendedReaction) => {
    const { message } = reaction

    console.log(reaction.emoji.name, reaction.client.triggers.reaction)

    if (!message.inGuild()) return

    const { client, emoji, users } = reaction
    const id = users.cache.first().id

    reaction.response = async function (content, replyMention = false, time) {
        const embeds = [new EmbedBuilder().setColor(colors.default).setDescription(content)]
        const message: Message<true> = await this.message.reply({
            embeds,
            allowedMentions: { repliedUser: false, users: replyMention ? [id] : [] },
        })
        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    }

    reaction.warn = async function (content, replyMention = false, time) {
        const embeds = [new EmbedBuilder().setColor(colors.warn).setDescription(content)]
        const message: Message<true> = await this.message.reply({
            embeds,
            allowedMentions: { repliedUser: false, users: replyMention ? [id] : [] },
        })
        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    }

    reaction.error = async function (content, replyMention = false, time) {
        const embeds = [new EmbedBuilder().setColor(colors.error).setDescription(content)]
        const message: Message<true> = await this.message.reply({
            embeds,
            allowedMentions: { repliedUser: false, users: replyMention ? [id] : [] },
        })
        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    }

    const trigger = client.triggers.reaction

    trigger.forEach((trigger, key) => {
        if (emoji.name === key && emoji.id === key) trigger.run(reaction)
    })
})
