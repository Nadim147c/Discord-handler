import type {
    AnySelectMenuInteraction,
    ChannelSelectMenuInteraction,
    GuildMember,
    MentionableSelectMenuInteraction,
    PermissionsString,
    RoleSelectMenuInteraction,
    StringSelectMenuInteraction,
    UserSelectMenuInteraction,
} from "discord.js"
import type ExtendedClient from "../structures/Client"
import type { InteractionReplier } from "./Commands"

interface SelectMenuExtender {
    customValue?: string
    response: InteractionReplier
    warn: InteractionReplier
    error: InteractionReplier
}

export interface ExtendedStringSelectMenu
    extends Omit<StringSelectMenuInteraction, "member" | "client">,
        SelectMenuExtender {
    member: GuildMember
    client: ExtendedClient
}
export interface ExtendedUserSelectMenu
    extends Omit<UserSelectMenuInteraction, "member" | "client">,
        SelectMenuExtender {
    member: GuildMember
    client: ExtendedClient
}
export interface ExtendedRoleSelectMenu
    extends Omit<RoleSelectMenuInteraction, "member" | "client">,
        SelectMenuExtender {
    member: GuildMember
    client: ExtendedClient
}
export interface ExtendedChannelSelectMenu
    extends Omit<ChannelSelectMenuInteraction, "member" | "client">,
        SelectMenuExtender {
    member: GuildMember
    client: ExtendedClient
}
export interface ExtendedMentionableSelectMenu
    extends Omit<MentionableSelectMenuInteraction, "member" | "client">,
        SelectMenuExtender {
    member: GuildMember
    client: ExtendedClient
}

export interface ExtendedAnySelectMenu
    extends Omit<AnySelectMenuInteraction, "member" | "client">,
        SelectMenuExtender {
    member: GuildMember
    client: ExtendedClient
}

export type SelectMenuFunction<Interaction> = (interaction: Interaction) => unknown

type SelectMenuType<
    T extends "String" | "User" | "Role" | "Channel" | "Mentionable",
    Interaction extends
        | ExtendedStringSelectMenu
        | ExtendedUserSelectMenu
        | ExtendedRoleSelectMenu
        | ExtendedChannelSelectMenu
        | ExtendedMentionableSelectMenu,
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
export type MentionableSelectMenuType = SelectMenuType<"Mentionable", ExtendedMentionableSelectMenu>

export type SelectModule =
    | StringSelectMenuType
    | UserSelectMenuType
    | RoleSelectMenuType
    | ChannelSelectMenuType
    | MentionableSelectMenuType
