import {
    AnySelectMenuInteraction,
    ChannelSelectMenuInteraction,
    GuildMember,
    PermissionsString,
    RoleSelectMenuInteraction,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction,
} from "discord.js"
import { ExtendedClient } from "../structures/Client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Replier = (content: string, ephemeral?: boolean, seconds?: number) => any

interface SelectMenuExtender {
    member: GuildMember
    client: ExtendedClient
    customValue?: string
    response: Replier
    warn: Replier
    error: Replier
}

export type ExtendedStringSelectMenu = StringSelectMenuInteraction & SelectMenuExtender
export type ExtendedUserSelectMenu = UserSelectMenuInteraction & SelectMenuExtender
export type ExtendedRoleSelectMenu = RoleSelectMenuInteraction & SelectMenuExtender
export type ExtendedChannelSelectMenu = ChannelSelectMenuInteraction & SelectMenuExtender
export type ExtendedAnySelectMenu = AnySelectMenuInteraction & SelectMenuExtender

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
