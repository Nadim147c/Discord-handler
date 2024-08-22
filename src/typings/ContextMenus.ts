import type {
    ApplicationCommandType,
    BaseApplicationCommandData,
    Collection,
    GuildMember,
    MessageContextMenuCommandInteraction,
    PermissionsString,
    UserContextMenuCommandInteraction,
} from "discord.js"
import type ExtendedClient from "../structures/Client.js"

export interface ExtendedMessageContextMenu
    extends Omit<MessageContextMenuCommandInteraction, "member" | "client"> {
    member: GuildMember
    client: ExtendedClient
}

// eslint-disable-next-line no-unused-vars
export type MessageContextMenuFunction = (interaction: ExtendedMessageContextMenu) => unknown

export type MessageContextMenuType = {
    type?: ApplicationCommandType
    name: string
    permissions?: PermissionsString[]
    run: MessageContextMenuFunction
} & BaseApplicationCommandData

export interface ExtendedUserContextMenu
    extends Omit<UserContextMenuCommandInteraction, "member" | "client"> {
    member: GuildMember
    client: ExtendedClient
}

// eslint-disable-next-line no-unused-vars
export type UserContextMenuFunction = (interaction: ExtendedUserContextMenu) => unknown

export type UserContextMenuType = {
    type?: ApplicationCommandType
    name: string
    permissions?: PermissionsString[]
    run: UserContextMenuFunction
} & BaseApplicationCommandData

export type ContextMenuType = {
    message: Collection<string, MessageContextMenuType>
    user: Collection<string, UserContextMenuType>
}
