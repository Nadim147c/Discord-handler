import { readdirSync } from "fs"
import ExtendedClient from "../structures/Client"
import { MessageTriggerType, ReactionTriggerType } from "../typings/Triggers"

export default async (client: ExtendedClient) => {
    const messagePath = `${__dirname}/../triggers/messages`
    const reactionPath = `${__dirname}/../triggers/reactions`
    const filter = (file: string) => file.endsWith(".ts") || file.endsWith(".js")

    async function messageLoader(path: string) {
        readdirSync(path).forEach(async (file) => {
            if (!filter(file) && (await client.isDir(`${path}/${file}`))) return messageLoader(`${path}/${file}`)
            const module: MessageTriggerType = await client.importFile(`${path}/${file}`)
            client.triggers.message.set(module.content, module)
        })
    }
    async function reactionLoader(path: string) {
        readdirSync(path).forEach(async (file) => {
            if (!filter(file) && (await client.isDir(`${path}/${file}`))) return reactionLoader(`${path}/${file}`)
            const module: ReactionTriggerType = await client.importFile(`${path}/${file}`)
            client.triggers.reaction.set(module.emoji, module)
        })
    }

    messageLoader(messagePath)
    reactionLoader(reactionPath)
}
