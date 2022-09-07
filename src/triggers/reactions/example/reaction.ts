import { ReactionTrigger } from "../../../structures/Trigger"

export default new ReactionTrigger({
    emoji: "⭐",
    async run(reaction) {
        reaction.response(`This trigger is handled by \`${__filename}\``)
    },
})
