import { UserContextMenu } from "../../../../structures/ContextMenu"

export default new UserContextMenu({
    name: "example",
    async run(command) {
        command.response(`This command is handled from \`${__filename}\``)
    },
})
