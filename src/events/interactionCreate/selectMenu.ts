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
type Interaction =
    | ExtendedStringSelectMenu
    | ExtendedUserSelectMenu
    | ExtendedRoleSelectMenu
    | ExtendedChannelSelectMenu
    | ExtendedMentionableSelectMenu

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isAnySelectMenu()) return

    const selectMenu = interaction as unknown as Interaction

    Object.assign(selectMenu, interactionRepliers)

    const [key, customValue] = selectMenu.customId.split(":")

    // eslint-disable-next-line no-param-reassign
    selectMenu.customValue = customValue

    let module: ModuleType | undefined

    if (selectMenu.isStringSelectMenu()) {
        module = selectMenu.client.selectMenus.string.get(key.replace(/[0-4]$/, ""))
    } else if (selectMenu.isUserSelectMenu()) {
        module = selectMenu.client.selectMenus.user.get(key.replace(/[0-4]$/, ""))
    } else if (selectMenu.isRoleSelectMenu()) {
        module = selectMenu.client.selectMenus.role.get(key.replace(/[0-4]$/, ""))
    } else if (selectMenu.isChannelSelectMenu()) {
        module = selectMenu.client.selectMenus.channel.get(key.replace(/[0-4]$/, ""))
    } else if (selectMenu.isMentionableSelectMenu()) {
        module = selectMenu.client.selectMenus.mentionable.get(key.replace(/[0-4]$/, ""))
    }

    if (!module) return

    const { member } = selectMenu

    if (module.permissions?.length && !member.permissions.has(module.permissions)) {
        const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
        selectMenu.warn(`You need following permissions to use this dropdown menu.\n${permissions}`)
        return
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        module.run(selectMenu as any)
    } catch (error) {
        logError(error)
    }
})
