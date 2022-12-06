import { EmbedBuilder, Message } from "discord.js"
import { colors } from "../../config"
import { InteractionReplier } from "../../typings/Commands"
import { TriggerReplier } from "../../typings/Triggers"

type ReplierObject<T> = { response: T; warn: T; error: T }

export const interactionRepliers: ReplierObject<InteractionReplier> = {
    async response(content, ephemeral = true, time = null) {
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
    },

    async warn(content, ephemeral = true, time = null) {
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
    },

    async error(content, ephemeral = true, time = null) {
        const embeds = [new EmbedBuilder().setColor(colors.error).setDescription(content)]
        let message: Message

        try {
            message = this.deferred
                ? await this.followUp({ embeds, ephemeral })
                : await this.reply({ embeds, ephemeral, fetchReply: true })
        } catch (_) {
            message = (await this.editReply({ embeds })) as Message
        }

        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    },
}

export const messageRepliers: ReplierObject<TriggerReplier> = {
    async response(content, replyMention = false, time = null) {
        const embeds = [new EmbedBuilder().setColor(colors.default).setDescription(content)]
        const message: Message<true> = await this.reply({ embeds, allowedMentions: { repliedUser: replyMention } })
        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    },

    async warn(content, replyMention = false, time = null) {
        const embeds = [new EmbedBuilder().setColor(colors.warn).setDescription(content)]
        const message: Message<true> = await this.reply({ embeds, allowedMentions: { repliedUser: replyMention } })
        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    },

    async error(content, replyMention = false, time = null) {
        const embeds = [new EmbedBuilder().setColor(colors.error).setDescription(content)]
        const message: Message<true> = await this.reply({ embeds, allowedMentions: { repliedUser: replyMention } })
        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    },
}

export const getReactionRepliers = (id: string): ReplierObject<TriggerReplier> => ({
    async response(content, replyMention = false, time = null) {
        const embeds = [new EmbedBuilder().setColor(colors.default).setDescription(content)]
        const message: Message<true> = await this.message.reply({
            embeds,
            allowedMentions: { repliedUser: false, users: replyMention ? [id] : [] },
        })
        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    },

    async warn(content, replyMention = false, time = null) {
        const embeds = [new EmbedBuilder().setColor(colors.warn).setDescription(content)]
        const message: Message<true> = await this.message.reply({
            embeds,
            allowedMentions: { repliedUser: false, users: replyMention ? [id] : [] },
        })
        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    },

    async error(content, replyMention = false, time = null) {
        const embeds = [new EmbedBuilder().setColor(colors.error).setDescription(content)]
        const message: Message<true> = await this.message.reply({
            embeds,
            allowedMentions: { repliedUser: false, users: replyMention ? [id] : [] },
        })
        if (!message || !time) return
        setTimeout(message.delete, time * 1000)
        return message
    },
})
