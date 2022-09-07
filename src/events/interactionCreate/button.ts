import { EmbedBuilder, inlineCode, Message } from "discord.js"
import { colors } from "../../config"
import { logError } from "../../functions/log/logger"
import { Event } from "../../structures/Event"
import { ExtendedButton } from "../../typings/Buttons"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return

    const button = interaction as ExtendedButton

    // For the buttons that are collect through messageComponent collector
    if (button.customId.startsWith("t:")) return

    const [key, customValue] = button.customId.split(":")

    button.customValue = customValue

    button.response = async function (content, ephemeral = true, time) {
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

    button.warn = async function (content, ephemeral = true, time) {
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

    button.error = async function (content, ephemeral = true, time) {
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

    const module = button.client.buttons.get(key)

    if (!module) return button.error("oops! There is any annoying error.")

    const { member } = button

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        return button.warn(`You need following permissions to use this button.\n${permissions}`)
    }

    try {
        module.run(button)
    } catch (error) {
        logError(error)
    }
})
