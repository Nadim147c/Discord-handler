import { ButtonInteraction, CommandInteractionOptionResolver, GuildMember, PermissionsString } from "discord.js"
import { ExtendedClient } from "../structures/Client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type replier = (content: string, ephemeral?: boolean, seconds?: number) => any

export interface ExtendedButton extends ButtonInteraction {
    options: CommandInteractionOptionResolver
    member: GuildMember
    client: ExtendedClient
    customValue?: string
    response: replier
    warn: replier
    error: replier
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ButtonFunction = (interaction: ExtendedButton) => any

export type ButtonType = {
    id: string
    permissions?: PermissionsString[]
    run: ButtonFunction
}
