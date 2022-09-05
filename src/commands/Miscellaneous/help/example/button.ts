import { createButton, createRow } from "../../../../functions/discord/components"
import { Command } from "../../../../structures/Command"

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
