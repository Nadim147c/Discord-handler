import { EmbedBuilder, inlineCode, Message } from "discord.js"
import { colors } from "../../config"
import { logError } from "../../functions/log/logger"
import { Event } from "../../structures/Event"
import { ExtendedMessageContextMenu, ExtendedUserContextMenu } from "../../typings/ContextMenus"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isContextMenuCommand()) return

    const context = interaction as ExtendedMessageContextMenu | ExtendedUserContextMenu

    context.response = async function (content, ephemeral = true, time) {
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

    context.warn = async function (content, ephemeral = true, time) {
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

    context.error = async function (content, ephemeral = true, time) {
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

    const { client } = context

    if (context.isMessageContextMenuCommand()) {
        const module = client.contextMenu.message.get(context.commandName)
        if (!module) return context.error("oops! There is any annoying error.")

        const { member } = context

        if (module.permissions?.length && !member.permissions.has(module.permissions)) {
            const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
            return context.warn(`You need following permissions to use this button.\n${permissions}`)
        }

        try {
            module.run(context)
        } catch (error) {
            logError(error)
        }
    } else if (context.isUserContextMenuCommand()) {
        const module = client.contextMenu.user.get(context.commandName)
        if (!module) return context.error("oops! There is any annoying error.")

        const { member } = context

        if (module.permissions?.length && !member.permissions.has(module.permissions)) {
            const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
            return context.warn(`You need following permissions to use this button.\n${permissions}`)
        }

        try {
            module.run(context)
        } catch (error) {
            logError(error)
        }
    }
})
