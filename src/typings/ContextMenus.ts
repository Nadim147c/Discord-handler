import {
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
    id: string
    permissions?: PermissionsString[]
    run: MessageContextMenuFunction
}

export interface ExtendedUserContextMenu extends UserContextMenuCommandInteraction {
    member: GuildMember
    client: ExtendedClient
    response: Replier
    warn: Replier
    error: Replier
}

export type UserContextMenuFunction = (interaction: ExtendedUserContextMenu) => unknown

export type UserContextMenuType = {
    id: string
    permissions?: PermissionsString[]
    run: UserContextMenuFunction
}

export type ContextMenuType = {
    message: Collection<string, MessageContextMenuType>
    user: Collection<string, UserContextMenuType>
}
