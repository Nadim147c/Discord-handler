import { srcDir } from "../dirname.js"
import type ExtendedClient from "../structures/Client.js"
import type {
    ChannelSelectMenuType,
    MentionableSelectMenuType,
    RoleSelectMenuType,
    StringSelectMenuType,
    UserSelectMenuType,
} from "../typings/SelectMenus.js"

type SelectModule =
    | StringSelectMenuType
    | UserSelectMenuType
    | RoleSelectMenuType
    | ChannelSelectMenuType
    | MentionableSelectMenuType

export default async (client: ExtendedClient) => {
    const path = `${srcDir}/interaction/select-menus`

    const files = await client.getFiles(path)

    const selects: SelectModule[] = await Promise.all(files.map((file) => client.importFile(file)))

    selects.forEach((select) => {
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
            case "Mentionable":
                client.selectMenus.mentionable.set(select.id, select)
                break
            default:
                break
        }
    })
}
