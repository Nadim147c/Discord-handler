import { inlineCode } from "discord.js"
import { logError } from "../../functions/log/logger.js"
import Event from "../../structures/Event.js"
import type { ButtonType, ExtendedButton } from "../../typings/Buttons.js"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return

    const button = interaction as unknown as ExtendedButton

    const key = button.customId.split(":").at(0) as string
    const customValue = button.customId.split(":").at(1)

    button.customValue = customValue

    const module = button.client.buttons.get(key) as ButtonType

    if (!module) return

    const { member } = button

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        return button.reply(`You need following permissions to use this button.\n${permissions}`)
    }

    try {
        module.run(button)
    } catch (error) {
        logError(error)
    }
})
