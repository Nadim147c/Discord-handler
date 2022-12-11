import { inlineCode } from "discord.js"
import { interactionRepliers } from "../../functions/discord/repliers"
import { logError } from "../../functions/log/logger"
import Event from "../../structures/Event"
import {
    ChannelSelectMenuType,
    ExtendedStringSelectMenu,
    ExtendedUserSelectMenu,
    MentionableSelectMenuType,
    RoleSelectMenuType,
    StringSelectMenuType,
    UserSelectMenuType,
    ExtendedChannelSelectMenu,
    ExtendedMentionableSelectMenu,
    ExtendedRoleSelectMenu,
} from "../../typings/SelectMenus"

type ModuleType =
    | StringSelectMenuType
    | UserSelectMenuType
    | RoleSelectMenuType
    | ChannelSelectMenuType
    | MentionableSelectMenuType
type InteractionType =
    | ExtendedStringSelectMenu
    | ExtendedUserSelectMenu
    | ExtendedRoleSelectMenu
    | ExtendedChannelSelectMenu
    | ExtendedMentionableSelectMenu

export default new Event("interactionCreate", async (interaction: InteractionType) => {
    if (!interaction.isAnySelectMenu()) return

    Object.assign(interaction, interactionRepliers)

    const [key, customValue] = interaction.customId.split(":")

    // eslint-disable-next-line no-param-reassign
    interaction.customValue = customValue

    let module: ModuleType

    switch (true) {
        case interaction.isStringSelectMenu():
            module = interaction.client.selectMenus.string.get(key.replace(/[0-4]$/, ""))
            break
        case interaction.isUserSelectMenu():
            module = interaction.client.selectMenus.user.get(key.replace(/[0-4]$/, ""))
            break
        case interaction.isRoleSelectMenu():
            module = interaction.client.selectMenus.role.get(key.replace(/[0-4]$/, ""))
            break
        case interaction.isChannelSelectMenu():
            module = interaction.client.selectMenus.channel.get(key.replace(/[0-4]$/, ""))
            break
        case interaction.isMentionableSelectMenu():
            module = interaction.client.selectMenus.mentionable.get(key.replace(/[0-4]$/, ""))
            break

        default:
            break
    }

    if (!module) return

    const { member } = interaction

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        interaction.warn(`You need following permissions to use this dropdown menu.\n${permissions}`)
        return
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        module.run(interaction as any)
    } catch (error) {
        logError(error)
    }
})
