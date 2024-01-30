import { inlineCode } from "discord.js"
import { interactionRepliers } from "../../functions/discord/repliers"
import { logError } from "../../functions/log/logger"
import Event from "../../structures/Event"
import { ExtendedButton } from "../../typings/Buttons"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return

    const button = interaction as unknown as ExtendedButton

    Object.assign(button, interactionRepliers)

    const [key, customValue] = button.customId.split(":")

    button.customValue = customValue

    const module = button.client.buttons.get(key)

    if (!module) return

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
