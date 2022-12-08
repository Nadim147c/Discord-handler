import type ExtendedClient from "../structures/Client"
import type { MessageTriggerType, ReactionTriggerType } from "../typings/Triggers"

export default async (client: ExtendedClient) => {
    const messagePath = `${__dirname}/../triggers/messages`
    const reactionPath = `${__dirname}/../triggers/reactions`

    async function messageLoader(path: string) {
        const files = await client.getFiles(path)

        const modules: MessageTriggerType[] = await Promise.all(files.map((file) => client.importFile(file)))

        modules.forEach((module) => client.triggers.message.set(module.content, module))
    }

    async function reactionLoader(path: string) {
        const files = await client.getFiles(path)

        const modules: ReactionTriggerType[] = await Promise.all(files.map((file) => client.importFile(file)))

        modules.forEach((module) => client.triggers.reaction.set(module.emoji, module))
    }

    messageLoader(messagePath)
    reactionLoader(reactionPath)
}
