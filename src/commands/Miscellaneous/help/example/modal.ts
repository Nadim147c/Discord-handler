import { TextInputStyle } from "discord.js"
import { createModalField, createModel } from "../../../../functions/discord/components.js"
import Command from "../../../../structures/Command.js"

export default new Command({
    data: {
        name: "modal",
        description: "modal example",
    },
    dev: true,
    async run(command) {
        const shortField = createModalField(
            "Short field",
            "short",
            "You can type anything.",
            TextInputStyle.Short
        )
        const paragraphField = createModalField(
            "Paragraph field",
            "paragraph",
            "You can type anything.",
            TextInputStyle.Paragraph
        )
        const modalBody = createModel("Modal title", "example").addComponents(
            shortField,
            paragraphField
        )
        await command.showModal(modalBody)
    },
})
