import { GuildMember, ModalSubmitInteraction, PermissionsString } from "discord.js"
import ExtendedClient from "../structures/Client.js"

export interface ExtendedModal extends Omit<ModalSubmitInteraction, "member" | "client"> {
    member: GuildMember
    client: ExtendedClient
    customValue?: string
}

// eslint-disable-next-line no-unused-vars
export type ModalSubmitFunction = (interaction: ExtendedModal) => unknown

export type ModalType = {
    id: string
    permissions?: PermissionsString[]
    run: ModalSubmitFunction
}
