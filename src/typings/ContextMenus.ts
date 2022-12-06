import {
    ApplicationCommandType,
    BaseApplicationCommandData,
    Collection,
    GuildMember,
    MessageContextMenuCommandInteraction,
    PermissionsString,
    UserContextMenuCommandInteraction,
} from "discord.js"
import ExtendedClient from "../structures/Client"
import { InteractionReplier } from "./Commands"

export interface ExtendedMessageContextMenu extends MessageContextMenuCommandInteraction {
    member: GuildMember
    client: ExtendedClient
    response: InteractionReplier
    warn: InteractionReplier
    error: InteractionReplier
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
    response: InteractionReplier
    warn: InteractionReplier
    error: InteractionReplier
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
