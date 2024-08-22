import type { GuildMember, ModalSubmitInteraction, PermissionsString } from "discord.js"
import type ExtendedClient from "../structures/Client.js"

export interface ExtendedModal extends Omit<ModalSubmitInteraction, "member" | "client"> {
    member: GuildMember
    client: ExtendedClient
    customValue?: string
}

export type ModalSubmitFunction = (interaction: ExtendedModal) => unknown

export type ModalType = {
    id: string
    permissions?: PermissionsString[]
    run: ModalSubmitFunction
}
