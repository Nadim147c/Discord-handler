import { readdirSync } from "fs"
import ExtendedClient from "../structures/Client"
import {
    ChannelSelectMenuType,
    RoleSelectMenuType,
    StringSelectMenuType,
    UserSelectMenuType,
} from "../typings/SelectMenus"

export default async (client: ExtendedClient) => {
    const pathFiles = `${__dirname}/../interaction/select-menus`
    const filter = (file: string) => file.endsWith(".ts") || file.endsWith(".js")

    async function loader(path: string) {
        readdirSync(path).forEach(async (file) => {
            if (!filter(file) && (await client.isDir(`${path}/${file}`))) return loader(`${path}/${file}`)

            type SelectModule = StringSelectMenuType | UserSelectMenuType | RoleSelectMenuType | ChannelSelectMenuType

            const select: SelectModule = await client.importFile(`${path}/${file}`)

            switch (select.type) {
                case "String":
                    client.selectMenus.string.set(select.id, select)
                    break
                case "User":
                    client.selectMenus.user.set(select.id, select)
                    break
                case "Role":
                    client.selectMenus.role.set(select.id, select)
                    break
                case "Channel":
                    client.selectMenus.channel.set(select.id, select)
                    break
                default:
                    break
            }
        })
    }

    loader(pathFiles)
}
