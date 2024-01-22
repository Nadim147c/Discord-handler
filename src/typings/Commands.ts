import {
    ApplicationCommandOptionChoiceData,
    AutocompleteInteraction,
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    PermissionsString,
    User,
    UserResolvable,
} from "discord.js"
import ExtendedClient from "../structures/Client"

export type InteractionReplier = (content: string, ephemeral?: boolean, seconds?: number) => unknown

export interface OptionsType extends CommandInteractionOptionResolver {
    getUser: (user: UserResolvable, required?: boolean) => User
    getString: (user: UserResolvable, required?: boolean) => string
}

export interface ExtendedCommand extends Omit<CommandInteraction, "options" | "member" | "client"> {
    options: OptionsType
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
