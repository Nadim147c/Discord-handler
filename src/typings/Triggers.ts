import { Collection, GuildMember, Message, MessageReaction } from "discord.js"
import { ExtendedClient } from "../structures/Client"

export type Replier = (content: string, replyMention?: boolean, seconds?: number) => unknown

export interface Extender {
    client: ExtendedClient
    response: Replier
    warn: Replier
    error: Replier
}
export type ExtendedMessage = Message & Extender & { member: GuildMember }

export type MessageTriggerFunction = (message: ExtendedMessage) => unknown

export type MessageTriggerType = {
    content: string
    run: MessageTriggerFunction
}

export type ExtendedReaction = MessageReaction & Extender

export type ReactionTriggerFunction = (reaction: ExtendedReaction) => unknown

export type ReactionTriggerType = {
    emoji: string
    run: ReactionTriggerFunction
}

export type TriggersType = {
    message: Collection<string, MessageTriggerType>
    reaction: Collection<string, ReactionTriggerType>
}
