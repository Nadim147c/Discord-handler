import { ButtonInteraction, GuildMember, PermissionsString } from "discord.js"
import ExtendedClient from "../structures/Client.js"

export interface ExtendedButton extends Omit<ButtonInteraction, "member" | "client"> {
    member: GuildMember
    client: ExtendedClient
    customValue?: string
}

// eslint-disable-next-line no-unused-vars
export type ButtonFunction = (interaction: ExtendedButton) => unknown

export type ButtonType = {
    id: string
    permissions?: PermissionsString[]
    run: ButtonFunction
}
