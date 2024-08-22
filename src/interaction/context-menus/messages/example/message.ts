import { MessageContentMenu } from "../../../../structures/ContextMenu.js"

export default new MessageContentMenu({
    name: "example",
    async run(context) {
        await context.reply(`This command is handled from \`${__filename}\``)
    },
})
