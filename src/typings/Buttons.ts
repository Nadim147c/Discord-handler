import { ButtonInteraction, GuildMember, PermissionsString } from "discord.js"
import { ExtendedClient } from "../structures/Client"

export type Replier = (content: string, ephemeral?: boolean, seconds?: number) => unknown

export interface ExtendedButton extends ButtonInteraction {
    member: GuildMember
    client: ExtendedClient
    customValue?: string
    response: Replier
    warn: Replier
    error: Replier
}

export type ButtonFunction = (interaction: ExtendedButton) => unknown

export type ButtonType = {
    id: string
    permissions?: PermissionsString[]
    run: ButtonFunction
}
