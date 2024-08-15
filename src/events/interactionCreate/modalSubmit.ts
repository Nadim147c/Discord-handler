import { inlineCode } from "discord.js"
import { logError } from "../../functions/log/logger.js"
import Event from "../../structures/Event.js"
import { ExtendedModal } from "../../typings/Modals.js"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isModalSubmit()) return

    const modal = interaction as unknown as ExtendedModal

    const [key, customValue] = modal.customId.split(":")

    modal.customValue = customValue

    const module = modal.client.modals.get(key!)

    if (!module) return

    const { member } = modal

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        return modal.reply(`You need following permissions to submit this modal.\n${permissions}`)
    }

    try {
        module.run(modal)
    } catch (error) {
        logError(error)
    }
})
