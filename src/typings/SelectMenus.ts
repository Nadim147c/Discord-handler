import {
    AnySelectMenuInteraction,
    ChannelSelectMenuInteraction,
    GuildMember,
    PermissionsString,
    RoleSelectMenuInteraction,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction,
} from "discord.js"
import ExtendedClient from "../structures/Client"
import { InteractionReplier } from "./Commands"

interface SelectMenuExtender {
    customValue?: string
    response: InteractionReplier
    warn: InteractionReplier
    error: InteractionReplier
}

export interface ExtendedStringSelectMenu extends StringSelectMenuInteraction, SelectMenuExtender {
    member: GuildMember
    client: ExtendedClient
}
export interface ExtendedUserSelectMenu extends UserSelectMenuInteraction, SelectMenuExtender {
    member: GuildMember
    client: ExtendedClient
}
export interface ExtendedRoleSelectMenu extends RoleSelectMenuInteraction, SelectMenuExtender {
    member: GuildMember
    client: ExtendedClient
}
export interface ExtendedChannelSelectMenu extends ChannelSelectMenuInteraction, SelectMenuExtender {
    member: GuildMember
    client: ExtendedClient
}
export type ExtendedAnySelectMenu = AnySelectMenuInteraction &
    SelectMenuExtender & {
        member: GuildMember
        client: ExtendedClient
    }

export type SelectMenuFunction<Interaction> = (interaction: Interaction) => unknown

type SelectMenuType<
    T extends "String" | "User" | "Role" | "Channel",
    Interaction extends
        | ExtendedStringSelectMenu
        | ExtendedUserSelectMenu
        | ExtendedRoleSelectMenu
        | ExtendedChannelSelectMenu,
> = {
    type?: T
    id: string
    permissions?: PermissionsString[]
    run: SelectMenuFunction<Interaction>
}

export type StringSelectMenuType = SelectMenuType<"String", ExtendedStringSelectMenu>
export type UserSelectMenuType = SelectMenuType<"User", ExtendedUserSelectMenu>
export type RoleSelectMenuType = SelectMenuType<"Role", ExtendedRoleSelectMenu>
export type ChannelSelectMenuType = SelectMenuType<"Channel", ExtendedChannelSelectMenu>
export type SelectModule = StringSelectMenuType | UserSelectMenuType | RoleSelectMenuType | ChannelSelectMenuType
