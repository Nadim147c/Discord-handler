import { inlineCode } from "discord.js"
import { interactionRepliers } from "../../functions/discord/repliers"
import { logError } from "../../functions/log/logger"
import Event from "../../structures/Event"
import { ExtendedButton } from "../../typings/Buttons"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return

    const buttonInteraction = interaction as ExtendedButton

    Object.assign(buttonInteraction, interactionRepliers)

    const [key, customValue] = buttonInteraction.customId.split(":")

    buttonInteraction.customValue = customValue

    const module = buttonInteraction.client.buttons.get(key)

    if (!module) return

    const { member } = buttonInteraction

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        return buttonInteraction.warn(`You need following permissions to use this button.\n${permissions}`)
    }

    try {
        module.run(buttonInteraction)
    } catch (error) {
        logError(error)
    }
})
