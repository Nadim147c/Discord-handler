import type ExtendedClient from "../structures/Client"
import type {
    ChannelSelectMenuType,
    RoleSelectMenuType,
    StringSelectMenuType,
    UserSelectMenuType,
} from "../typings/SelectMenus"

type SelectModule = StringSelectMenuType | UserSelectMenuType | RoleSelectMenuType | ChannelSelectMenuType

export default async (client: ExtendedClient) => {
    const path = `${__dirname}/../interaction/select-menus`

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
            default:
                break
        }
    })
}
