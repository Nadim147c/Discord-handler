import { inlineCode } from "discord.js"
import { interactionRepliers } from "../../functions/discord/repliers"
import { logError } from "../../functions/log/logger"
import Event from "../../structures/Event"
import {
    ChannelSelectMenuType,
    ExtendedAnySelectMenu,
    RoleSelectMenuType,
    StringSelectMenuType,
    UserSelectMenuType,
} from "../../typings/SelectMenus"

export default new Event("interactionCreate", async (interaction: ExtendedAnySelectMenu) => {
    if (!interaction.isAnySelectMenu()) return

    Object.assign(interaction, interactionRepliers)

    // For the buttons that are collect through messageComponent collector
    if (interaction.customId.startsWith("t:")) return

    const [key, customValue] = interaction.customId.split(":")

    // eslint-disable-next-line no-param-reassign
    interaction.customValue = customValue

    function checkPermission(
        module: StringSelectMenuType | UserSelectMenuType | RoleSelectMenuType | ChannelSelectMenuType,
    ): boolean {
        const { member } = interaction

        if (module.permissions?.length && !member.permissions.has(module.permissions)) {
            const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
            interaction.warn(`You need following permissions to use this dropdown menu.\n${permissions}`)
            return true
        }
        return false
    }

    if (interaction.isStringSelectMenu()) {
        const module = interaction.client.selectMenus.string.get(key.replace(/[0-4]$/, ""))

        if (!module) return interaction.error("oops! There is any annoying error.")
        if (checkPermission(module)) return

        try {
            module.run(interaction)
        } catch (error) {
            logError(error)
        }
    } else if (interaction.isUserSelectMenu()) {
        const module = interaction.client.selectMenus.user.get(key.replace(/[0-4]$/, ""))

        if (!module) return interaction.error("oops! There is any annoying error.")
        if (checkPermission(module)) return

        try {
            module.run(interaction)
        } catch (error) {
            logError(error)
        }
    }
    if (interaction.isRoleSelectMenu()) {
        const module = interaction.client.selectMenus.role.get(key.replace(/[0-4]$/, ""))

        if (!module) return interaction.error("oops! There is any annoying error.")
        if (checkPermission(module)) return

        try {
            module.run(interaction)
        } catch (error) {
            logError(error)
        }
    }
    if (interaction.isChannelSelectMenu()) {
        const module = interaction.client.selectMenus.channel.get(key.replace(/[0-4]$/, ""))

        if (!module) return interaction.error("oops! There is any annoying error.")
        if (checkPermission(module)) return

        try {
            module.run(interaction)
        } catch (error) {
            logError(error)
        }
    }
})
