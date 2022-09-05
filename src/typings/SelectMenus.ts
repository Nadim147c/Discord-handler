import { CommandInteractionOptionResolver, GuildMember, PermissionsString, SelectMenuInteraction } from "discord.js"
import { ExtendedClient } from "../structures/Client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type replier = (content: string, ephemeral?: boolean, seconds?: number) => any

export interface ExtendedSelectMenu extends SelectMenuInteraction {
    options: CommandInteractionOptionResolver
    member: GuildMember
    client: ExtendedClient
    customValue?: string
    response: replier
    warn: replier
    error: replier
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SelectMenuFunction = (interaction: ExtendedSelectMenu) => any

export type SelectMenuType = {
    id: string
    permissions?: PermissionsString[]
    run: SelectMenuFunction
}
