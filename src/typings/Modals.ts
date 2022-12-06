import { GuildMember, ModalSubmitInteraction, PermissionsString } from "discord.js"
import ExtendedClient from "../structures/Client"
import { InteractionReplier } from "./Commands"

export interface ExtendedModal extends ModalSubmitInteraction {
    member: GuildMember
    client: ExtendedClient
    customValue?: string
    response: InteractionReplier
    warn: InteractionReplier
    error: InteractionReplier
}

export type ModalSubmitFunction = (interaction: ExtendedModal) => unknown

export type ModalType = {
    id: string
    permissions?: PermissionsString[]
    run: ModalSubmitFunction
}
