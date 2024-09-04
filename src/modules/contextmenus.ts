import type { MessageApplicationCommandData, UserApplicationCommandData } from "discord.js"
import { srcDir } from "../dirname.js"
import Print from "../functions/log/Color.js"
import type ExtendedClient from "../structures/Client.js"
import type { MessageContextMenuType, UserContextMenuType } from "../typings/ContextMenus.js"

export default async (client: ExtendedClient) => {
    const userPath = `${srcDir}/interaction/context-menus/users`
    const messagePath = `${srcDir}/interaction/context-menus/messages`

    Print.title("[Module]", "loading ContextMenus")

    const userContextPaths = await client.getFiles(userPath)

    for await (const file of userContextPaths) {
        const userContextMenu = (await client.importFile(file)) as UserContextMenuType
        Print.gray("[UserContextMenu]", `ID:${userContextMenu.name}`)
        client.contextMenus.user.set(userContextMenu.name, userContextMenu)
        client.commandData.add(userContextMenu as UserApplicationCommandData)
    }

    const messageContextPaths = await client.getFiles(messagePath)

    for await (const file of messageContextPaths) {
        const messageContextMenu = (await client.importFile(file)) as MessageContextMenuType
        Print.gray("[MessageContextMenu]", `ID:${messageContextMenu.name}`)
        client.contextMenus.message.set(messageContextMenu.name, messageContextMenu)
        client.commandData.add(messageContextMenu as MessageApplicationCommandData)
    }
}
