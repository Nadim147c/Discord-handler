import { GuildMember, PermissionsString, SelectMenuInteraction } from "discord.js"
import { ExtendedClient } from "../structures/Client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Replier = (content: string, ephemeral?: boolean, seconds?: number) => any

export interface ExtendedSelectMenu extends SelectMenuInteraction {
    member: GuildMember
    client: ExtendedClient
    customValue?: string
    response: Replier
    warn: Replier
    error: Replier
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SelectMenuFunction = (interaction: ExtendedSelectMenu) => any

export type SelectMenuType = {
    id: string
    permissions?: PermissionsString[]
    run: SelectMenuFunction
}
