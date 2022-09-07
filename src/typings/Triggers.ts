import { Collection, GuildMember, Message, MessageReaction } from "discord.js"
import { ExtendedClient } from "../structures/Client"

export type Replier = (content: string, replyMention?: boolean, seconds?: number) => unknown

export interface ExtendedMessage extends Message {
    member: GuildMember
    client: ExtendedClient
    response: Replier
    warn: Replier
    error: Replier
}

export type MessageTriggerFunction = (message: ExtendedMessage) => unknown

export type MessageTriggerType = {
    content: string
    run: MessageTriggerFunction
}

export interface ExtendedReaction extends MessageReaction {
    client: ExtendedClient
    response: Replier
    warn: Replier
    error: Replier
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
