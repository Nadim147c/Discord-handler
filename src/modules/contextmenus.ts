import { MessageApplicationCommandData, UserApplicationCommandData } from "discord.js"
import type ExtendedClient from "../structures/Client"
import type { MessageContextMenuType, UserContextMenuType } from "../typings/ContextMenus"

export default async (client: ExtendedClient) => {
    const userPath = `${__dirname}/../interaction/context-menus/users`
    const messagePath = `${__dirname}/../interaction/context-menus/messages`

    async function userLoader(path: string) {
        const files = await client.getFiles(path)

        const modules: UserContextMenuType[] = await Promise.all(files.map((file) => client.importFile(file)))

        modules.forEach((module) => {
            client.contextMenus.user.set(module.name, module)
            client.commandData.add(module as UserApplicationCommandData)
        })
    }

    async function messageLoader(path: string) {
        const files = await client.getFiles(path)
        const modules: MessageContextMenuType[] = await Promise.all(files.map((file) => client.importFile(file)))

        modules.forEach((module) => {
            client.contextMenus.message.set(module.name, module)
            client.commandData.add(module as MessageApplicationCommandData)
        })
    }

    userLoader(userPath)
    messageLoader(messagePath)
}
