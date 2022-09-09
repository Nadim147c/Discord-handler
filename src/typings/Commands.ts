import {
    ApplicationCommandOptionChoiceData,
    AutocompleteInteraction,
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionsString,
} from "discord.js"
import { ExtendedClient } from "../structures/Client"

export type Replier = (content: string, ephemeral?: boolean, seconds?: number) => unknown

export interface ExtendedCommand extends CommandInteraction {
    options: CommandInteractionOptionResolver
    member: GuildMember
    client: ExtendedClient
    response: Replier
    warn: Replier
    error: Replier
}

export interface ExtendedAutoComplete extends AutocompleteInteraction {
    member: GuildMember
    client: ExtendedClient
}

export type CommandFunction = (interaction: ExtendedCommand) => unknown

export type AutoCompleteFunction = (
    interaction: ExtendedAutoComplete,
    focused: string,
) => Promise<ApplicationCommandOptionChoiceData[]>

export type CommandType = {
    data: ChatInputApplicationCommandData
    dev?: boolean
    beta?: boolean
    timeout?: number
    category?: string
    permissions?: PermissionsString[]
    deffer?: boolean
    ephemeral?: boolean
    autocomplete?: AutoCompleteFunction
    run: CommandFunction
}
