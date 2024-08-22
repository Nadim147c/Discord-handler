import { inlineCode } from "discord.js"
import { logError } from "../../functions/log/logger.js"
import Event from "../../structures/Event.js"
import type {
    ExtendedMessageContextMenu,
    ExtendedUserContextMenu,
    MessageContextMenuType,
    UserContextMenuType,
} from "../../typings/ContextMenus.js"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isContextMenuCommand()) return

    const context = interaction as unknown as ExtendedMessageContextMenu | ExtendedUserContextMenu

    const { member, client } = context

    async function checkPermission(module: MessageContextMenuType | UserContextMenuType) {
        if (module.permissions?.length && !member.permissions.has(module.permissions)) {
            const permissions = module.permissions.map((x) => inlineCode(x)).join(", ")
            await context.reply(
                `You need following permissions to use this dropdown menu.\n${permissions}`
            )
            return true
        }
        return false
    }

    if (context.isMessageContextMenuCommand()) {
        const module = client.contextMenus.message.get(context.commandName)
        if (!module) return await context.reply("oops! There is any annoying error.")

        if (await checkPermission(module)) return

        try {
            module.run(context)
        } catch (error) {
            logError(error)
        }
    } else if (context.isUserContextMenuCommand()) {
        const module = client.contextMenus.user.get(context.commandName)
        if (!module) return await context.reply("oops! There is any annoying error.")

        if (await checkPermission(module)) return

        try {
            module.run(context)
        } catch (error) {
            logError(error)
        }
    }
})
