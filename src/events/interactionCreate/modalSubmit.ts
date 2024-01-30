import { inlineCode } from "discord.js"
import { interactionRepliers } from "../../functions/discord/repliers"
import { logError } from "../../functions/log/logger"
import Event from "../../structures/Event"
import { ExtendedModal } from "../../typings/Modals"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isModalSubmit()) return

    const modal = interaction as unknown as ExtendedModal

    const [key, customValue] = modal.customId.split(":")

    // eslint-disable-next-line no-param-reassign
    modal.customValue = customValue

    Object.assign(modal, interactionRepliers)

    const module = modal.client.modals.get(key)

    if (!module) return

    const { member } = modal

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        return modal.warn(`You need following permissions to submit this modal.\n${permissions}`)
    }

    try {
        module.run(modal)
    } catch (error) {
        logError(error)
    }
})
