import { MessageContentMenu } from "../../../../structures/ContextMenu"

export default new MessageContentMenu({
    name: "example",
    async run(context) {
        context.response(`This command is handled from \`${__filename}\``)
    },
})
