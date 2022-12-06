import { MessageApplicationCommandData, UserApplicationCommandData } from "discord.js"
import { readdirSync } from "fs"
import ExtendedClient from "../structures/Client"
import { MessageContextMenuType, UserContextMenuType } from "../typings/ContextMenus"

export default async (client: ExtendedClient) => {
    const userPath = `${__dirname}/../interaction/context-menus/users`
    const messagePath = `${__dirname}/../interaction/context-menus/messages`
    const filter = (file: string) => file.endsWith(".ts") || file.endsWith(".js")

    async function userLoader(path: string) {
        readdirSync(path).forEach(async (file) => {
            if (!filter(file) && (await client.isDir(`${path}/${file}`))) return userLoader(`${path}/${file}`)
            const module: UserContextMenuType = await client.importFile(`${path}/${file}`)
            client.contextMenus.user.set(module.name, module)
            client.commandData.add(module as UserApplicationCommandData)
        })
    }
    async function messageLoader(path: string) {
        readdirSync(path).forEach(async (file) => {
            if (!filter(file) && (await client.isDir(`${path}/${file}`))) return messageLoader(`${path}/${file}`)
            const module: MessageContextMenuType = await client.importFile(`${path}/${file}`)
            client.contextMenus.message.set(module.name, module)
            client.commandData.add(module as MessageApplicationCommandData)
        })
    }

    userLoader(userPath)
    messageLoader(messagePath)
}
