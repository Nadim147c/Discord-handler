import { GuildMember, ModalSubmitInteraction, PermissionsString } from "discord.js"
import { ExtendedClient } from "../structures/Client"

export type Replier = (content: string, ephemeral?: boolean, seconds?: number) => unknown

export interface ExtendedModal extends ModalSubmitInteraction {
    member: GuildMember
    client: ExtendedClient
    customValue?: string
    response: Replier
    warn: Replier
    error: Replier
}

export type ModalSubmitFunction = (interaction: ExtendedModal) => unknown

export type ModalType = {
    id: string
    permissions?: PermissionsString[]
    run: ModalSubmitFunction
}
