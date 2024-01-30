import {
    ApplicationCommandOptionChoiceData,
    AutocompleteInteraction,
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionsString
} from "discord.js"
import ExtendedClient from "../structures/Client"

export type InteractionReplier = (content: string, ephemeral?: boolean, seconds?: number) => unknown

export interface ExtendedCommand extends Omit<CommandInteraction, "options" | "member" | "client"> {
    options: CommandInteractionOptionResolver
    member: GuildMember
    client: ExtendedClient
    response: InteractionReplier
    warn: InteractionReplier
    error: InteractionReplier
}

export interface ExtendedAutoComplete extends Omit<AutocompleteInteraction, "member" | "client"> {
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
