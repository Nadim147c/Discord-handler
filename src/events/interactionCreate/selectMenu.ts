import { EmbedBuilder, inlineCode, Message } from "discord.js"
import { colors } from "../../config"
import { logError } from "../../functions/log/logger"
import { Event } from "../../structures/Event"
import { ExtendedSelectMenu } from "../../typings/SelectMenus"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isSelectMenu()) return

    const select = interaction as ExtendedSelectMenu

    // For the buttons that are collect through messageComponent collector
    if (select.customId.startsWith("t:")) return

    const [key, customValue] = select.customId.split(":")

    select.customValue = customValue

    select.response = async function (content, ephemeral = true, time) {
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

    select.warn = async function (content, ephemeral = true, time) {
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

    select.error = async function (content, ephemeral = true, time) {
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

    const module = select.client.selectMenus.get(key.replace(/[0-4]$/, ""))

    if (!module) return select.error("oops! There is any annoying error.")

    const { member } = select

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        return select.warn(`You need following permissions to use this dropdown menu.\n${permissions}`)
    }

    try {
        module.run(select)
    } catch (error) {
        logError(error)
    }
})
