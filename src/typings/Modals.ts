import { CommandInteractionOptionResolver, GuildMember, ModalSubmitInteraction, PermissionsString } from "discord.js"
import { ExtendedClient } from "../structures/Client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type replier = (content: string, ephemeral?: boolean, seconds?: number) => any

export interface ExtendedModal extends ModalSubmitInteraction {
    options: CommandInteractionOptionResolver
    member: GuildMember
    client: ExtendedClient
    customValue?: string
    response: replier
    warn: replier
    error: replier
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModalSubmitFunction = (interaction: ExtendedModal) => any

export type ModalType = {
    id: string
    permissions?: PermissionsString[]
    run: ModalSubmitFunction
}
