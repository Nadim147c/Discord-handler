import {
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionsString,
} from "discord.js"
import { ExtendedClient } from "../structures/Client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type replier = (content: string, ephemeral?: boolean, seconds?: number) => any

export interface ExtendedCommand extends CommandInteraction {
    options: CommandInteractionOptionResolver
    member: GuildMember
    client: ExtendedClient
    response: replier
    warn: replier
    error: replier
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommandFunction = (interaction: ExtendedCommand) => any

export type CommandType = {
    data: ChatInputApplicationCommandData
    dev?: boolean
    beta?: boolean
    timeout?: number
    category?: string
    permissions?: PermissionsString[]
    deffer?: boolean
    ephemeral?: boolean
    run: CommandFunction
}
