import { EmbedBuilder, inlineCode, Message } from "discord.js"
import { colors } from "../../../config"
import { logError } from "../../../functions/log/logger"
import { Event } from "../../../structures/Event"
import { ExtendedModal } from "../../../typings/Modals"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isModalSubmit()) return

    const modalSubmit = interaction as ExtendedModal

    // For the buttons that are collect through messageComponent collector
    if (modalSubmit.customId.startsWith("t:")) return

    const [key, customValue] = modalSubmit.customId.split(":")

    modalSubmit.customValue = customValue

    modalSubmit.response = async function (content, ephemeral = true, time) {
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

    modalSubmit.warn = async function (content, ephemeral = true, time) {
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

    modalSubmit.error = async function (content, ephemeral = true, time) {
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

    const module = modalSubmit.client.modals.get(key)

    if (!module) return modalSubmit.error("oops! There is any annoying error.")

    const { member } = modalSubmit

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        return modalSubmit.warn(`You need following permissions to use this button.\n${permissions}`)
    }

    try {
        module.run(modalSubmit)
    } catch (error) {
        logError(error)
    }
})
