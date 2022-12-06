import { Collection, GuildMember, Message, MessageReaction } from "discord.js"
import ExtendedClient from "../structures/Client"

export type TriggerReplier = (content: string, replyMention?: boolean, seconds?: number) => unknown

export interface Extender {
    response: TriggerReplier
    warn: TriggerReplier
    error: TriggerReplier
}
export interface ExtendedMessage extends Message, Extender {
    client: ExtendedClient
    member: GuildMember
}

export type MessageTriggerFunction = (message: ExtendedMessage) => unknown

export type MessageTriggerType = {
    content: string
    run: MessageTriggerFunction
}

export interface ExtendedReaction extends MessageReaction, Extender {
    client: ExtendedClient
}

export type ReactionTriggerFunction = (reaction: ExtendedReaction) => unknown

export type ReactionTriggerType = {
    emoji: string
    run: ReactionTriggerFunction
}

export type TriggersType = {
    message: Collection<string, MessageTriggerType>
    reaction: Collection<string, ReactionTriggerType>
}
