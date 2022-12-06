import { messageRepliers } from "../../functions/discord/repliers"
import Event from "../../structures/Event"
import { ExtendedMessage } from "../../typings/Triggers"

export default new Event("messageCreate", async (message: ExtendedMessage) => {
    if (!message.inGuild()) return

    const { client, content } = message

    Object.assign(message, messageRepliers)

    const triggers = client.triggers.message

    triggers.forEach((trigger, key) => {
        if (content.match(new RegExp(key, "gi"))) trigger.run(message)
    })
})
