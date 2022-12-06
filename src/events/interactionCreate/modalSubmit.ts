import { inlineCode } from "discord.js"
import { interactionRepliers } from "../../functions/discord/repliers"
import { logError } from "../../functions/log/logger"
import Event from "../../structures/Event"
import { ExtendedModal } from "../../typings/Modals"

export default new Event("interactionCreate", async (interaction: ExtendedModal) => {
    if (!interaction.isModalSubmit()) return

    // For the buttons that are collect through messageComponent collector
    if (interaction.customId.startsWith("t:")) return

    const [key, customValue] = interaction.customId.split(":")

    // eslint-disable-next-line no-param-reassign
    interaction.customValue = customValue

    Object.assign(interaction, interactionRepliers)

    const module = interaction.client.modals.get(key)

    if (!module) return interaction.error("oops! There is any annoying error.")

    const { member } = interaction

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        return interaction.warn(`You need following permissions to submit this modal.\n${permissions}`)
    }

    try {
        module.run(interaction)
    } catch (error) {
        logError(error)
    }
})
