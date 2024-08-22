import { UserContextMenu } from "../../../../structures/ContextMenu.js"

export default new UserContextMenu({
    name: "example",
    async run(command) {
        await command.reply(`This command is handled from \`${__filename}\``)
    },
})
