import { SelectMenuType } from "discord.js"
import { srcDir } from "../dirname.js"
import Print from "../functions/log/Color.js"
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

    Print.title("[Module]", "loading SelectMenus")

    const files = await client.getFiles(path)

    for await (const file of files) {
        const select = (await client.importFile(file)) as SelectModule
        Print.gray(`[SelectMenu${select.type}]`, `ID:${select.id}`)

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
        }
    }
}
