import { createSelectMenu } from "../../../../functions/discord/components"
import { Command } from "../../../../structures/Command"

export default new Command({
    data: {
        name: "selectmenu",
        description: "Select menu example",
    },
    dev: true,
    async run(command) {
        const components = createSelectMenu(
            "Make your selection",
            "example",
            false,
            {
                label: "Example",
                value: "example",
                description: "This is chosen by default",
                emoji: { name: "💡" },
                default: true,
            },
            {
                label: "Another Option",
                value: "example2",
                emoji: { name: "❌" },
            },
        )
        command.reply({ components, ephemeral: true })
    },
})
