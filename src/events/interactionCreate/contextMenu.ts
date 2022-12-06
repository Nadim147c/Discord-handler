import { inlineCode } from "discord.js"
import { logError } from "../../functions/log/logger"
import Event from "../../structures/Event"
import {
    ExtendedMessageContextMenu,
    ExtendedUserContextMenu,
    MessageContextMenuType,
    UserContextMenuType,
} from "../../typings/ContextMenus"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isContextMenuCommand()) return

    const context = interaction as ExtendedMessageContextMenu | ExtendedUserContextMenu

    const { member, client } = context

    function checkPermission(module: MessageContextMenuType | UserContextMenuType): boolean {
        if (module.permissions?.length && !member.permissions.has(module.permissions)) {
            const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
            context.warn(`You need following permissions to use this dropdown menu.\n${permissions}`)
            return true
        }
        return false
    }

    if (context.isMessageContextMenuCommand()) {
        const module = client.contextMenus.message.get(context.commandName)
        if (!module) return context.error("oops! There is any annoying error.")

        if (checkPermission(module)) return

        try {
            module.run(context)
        } catch (error) {
            logError(error)
        }
    } else if (context.isUserContextMenuCommand()) {
        const module = client.contextMenus.user.get(context.commandName)
        if (!module) return context.error("oops! There is any annoying error.")

        if (checkPermission(module)) return

        try {
            module.run(context)
        } catch (error) {
            logError(error)
        }
    }
})
