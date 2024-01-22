import { ButtonInteraction, GuildMember, PermissionsString } from "discord.js"
import ExtendedClient from "../structures/Client"
import { InteractionReplier } from "./Commands"

export interface ExtendedButton extends Omit<ButtonInteraction, "member" | "client"> {
    member: GuildMember
    client: ExtendedClient
    customValue?: string
    response: InteractionReplier
    warn: InteractionReplier
    error: InteractionReplier
}

export type ButtonFunction = (interaction: ExtendedButton) => unknown

export type ButtonType = {
    id: string
    permissions?: PermissionsString[]
    run: ButtonFunction
}
