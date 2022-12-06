import { getReactionRepliers } from "../../functions/discord/repliers"
import Event from "../../structures/Event"
import { ExtendedReaction } from "../../typings/Triggers"

export default new Event("messageReactionAdd", async (reaction, user) => {
    if (!reaction.message.inGuild()) return

    if (reaction.partial) await reaction.message.fetch()

    const { id } = user

    const react = reaction as ExtendedReaction
    const { client, emoji } = react

    const repliers = getReactionRepliers(id)
    Object.assign(react, repliers)

    const triggers = client.triggers.reaction

    triggers.forEach((trigger, key) => {
        if (emoji.name === key || emoji.id === key) trigger.run(react)
    })
})
