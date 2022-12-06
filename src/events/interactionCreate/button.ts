import { inlineCode } from "discord.js"
import { interactionRepliers } from "../../functions/discord/repliers"
import { logError } from "../../functions/log/logger"
import Event from "../../structures/Event"
import { ExtendedButton } from "../../typings/Buttons"

export default new Event("interactionCreate", async (interaction: ExtendedButton) => {
    if (!interaction.isButton()) return

    Object.assign(interaction, interactionRepliers)

    // For the buttons that are collect through messageComponent collector
    if (interaction.customId.startsWith("t:")) return

    const [key, customValue] = interaction.customId.split(":")

    // eslint-disable-next-line no-param-reassign
    interaction.customValue = customValue

    const module = interaction.client.buttons.get(key)

    if (!module) return interaction.error("oops! There is any annoying error.")

    const { member } = interaction

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        return interaction.warn(`You need following permissions to use this button.\n${permissions}`)
    }

    try {
        module.run(interaction)
    } catch (error) {
        logError(error)
    }
})
