import {
    ApplicationCommandType,
    BaseApplicationCommandData,
    Collection,
    GuildMember,
    MessageContextMenuCommandInteraction,
    PermissionsString,
    UserContextMenuCommandInteraction,
} from "discord.js"
import { ExtendedClient } from "../structures/Client"

export type Replier = (content: string, ephemeral?: boolean, seconds?: number) => unknown

export interface ExtendedMessageContextMenu extends MessageContextMenuCommandInteraction {
    member: GuildMember
    client: ExtendedClient
    response: Replier
    warn: Replier
    error: Replier
}

export type MessageContextMenuFunction = (interaction: ExtendedMessageContextMenu) => unknown

export type MessageContextMenuType = {
    type?: ApplicationCommandType
    name: string
    permissions?: PermissionsString[]
    run: MessageContextMenuFunction
} & BaseApplicationCommandData

export interface ExtendedUserContextMenu extends UserContextMenuCommandInteraction {
    member: GuildMember
    client: ExtendedClient
    response: Replier
    warn: Replier
    error: Replier
}

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
