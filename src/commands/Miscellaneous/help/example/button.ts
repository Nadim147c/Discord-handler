import { createButton, createRow } from "../../../../functions/discord/components.js"
import Command from "../../../../structures/Command.js"

export default new Command({
    data: {
        name: "button",
        description: "button example",
    },
    dev: true,
    async run(command) {
        const components = [createRow(createButton("example", "example"))]
        command.reply({ components, ephemeral: true })
    },
})
