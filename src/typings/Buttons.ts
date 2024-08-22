import type { ButtonInteraction, GuildMember, PermissionsString } from "discord.js"
import type ExtendedClient from "../structures/Client.js"

export interface ExtendedButton extends Omit<ButtonInteraction, "member" | "client"> {
    member: GuildMember
    client: ExtendedClient
    customValue?: string
}

export type ButtonFunction = (interaction: ExtendedButton) => unknown

export type ButtonType = {
    id: string
    permissions?: PermissionsString[]
    run: ButtonFunction
}
