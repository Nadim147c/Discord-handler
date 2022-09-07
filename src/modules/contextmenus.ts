import { readdirSync } from "fs"
import { ExtendedClient } from "../structures/Client"
import { MessageContextMenuType, UserContextMenuType } from "../typings/ContextMenus"

export default async (client: ExtendedClient) => {
    const userPath = `${__dirname}/../interaction/context-menus/users`
    const messagePath = `${__dirname}/../interaction/context-menus/messages`
    const filter = (file: string) => file.endsWith(".ts") || file.endsWith(".js")

    async function userLoader(path: string) {
        readdirSync(path).forEach(async (file: string) => {
            if (!filter(`${path}/${file}`) && (await client.isDir(`${path}/${file}`)))
                return userLoader(`${path}/${file}`)
            const module: UserContextMenuType = await client.importFile(`${path}/${file}`)
            client.contextMenu.user.set(module.id, module)
        })
    }
    async function messageLoader(path: string) {
        readdirSync(path).forEach(async (file: string) => {
            if (!filter(`${path}/${file}`) && (await client.isDir(`${path}/${file}`)))
                return userLoader(`${path}/${file}`)
            const module: MessageContextMenuType = await client.importFile(`${path}/${file}`)
            client.contextMenu.message.set(module.id, module)
        })
    }

    userLoader(userPath)
    messageLoader(messagePath)
}
