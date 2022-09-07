import { MessageTrigger } from "../../../structures/Trigger"

export default new MessageTrigger({
    content: "example",
    async run(message) {
        message.response(`This trigger is handled by \`${__filename}\``)
    },
})
