import { inlineCode } from "discord.js"
import { logError } from "../../functions/log/logger.js"
import Event from "../../structures/Event.js"
import type {
    ChannelSelectMenuType,
    ExtendedChannelSelectMenu,
    ExtendedMentionableSelectMenu,
    ExtendedRoleSelectMenu,
    ExtendedStringSelectMenu,
    ExtendedUserSelectMenu,
    MentionableSelectMenuType,
    RoleSelectMenuType,
    StringSelectMenuType,
    UserSelectMenuType,
} from "../../typings/SelectMenus.js"

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

    const key = selectMenu.customId.split(":").at(0) as string
    const customValue = selectMenu.customId.split(":").at(1)

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
        return selectMenu.reply(
            `You need following permissions to use this dropdown menu.\n${permissions}`
        )
    }

    try {
        // NOTE: SKILL ISSUE! But works fine...
        //@ts-ignore
        module.run(selectMenu)
    } catch (error) {
        logError(error)
    }
})
