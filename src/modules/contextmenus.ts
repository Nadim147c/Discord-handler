import type { MessageApplicationCommandData, UserApplicationCommandData } from "discord.js"
import { srcDir } from "../dirname.js"
import type ExtendedClient from "../structures/Client.js"
import type { MessageContextMenuType, UserContextMenuType } from "../typings/ContextMenus.js"

export default async (client: ExtendedClient) => {
    const userPath = `${srcDir}/interaction/context-menus/users`
    const messagePath = `${srcDir}/interaction/context-menus/messages`

    async function userLoader(path: string) {
        const files = await client.getFiles(path)

        const modules: UserContextMenuType[] = await Promise.all(
            files.map((file) => client.importFile(file))
        )

        for (const module of modules) {
            client.contextMenus.user.set(module.name, module)
            client.commandData.add(module as UserApplicationCommandData)
        }
    }

    async function messageLoader(path: string) {
        const files = await client.getFiles(path)
        const modules: MessageContextMenuType[] = await Promise.all(
            files.map((file) => client.importFile(file))
        )

        for (const module of modules) {
            client.contextMenus.message.set(module.name, module)
            client.commandData.add(module as MessageApplicationCommandData)
        }
    }

    userLoader(userPath)
    messageLoader(messagePath)
}
