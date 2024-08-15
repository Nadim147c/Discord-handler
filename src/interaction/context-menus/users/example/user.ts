import { UserContextMenu } from "../../../../structures/ContextMenu.js"

export default new UserContextMenu({
    name: "example",
    async run(command) {
        command.reply(`This command is handled from \`${__filename}\``)
    },
})
