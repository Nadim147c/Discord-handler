import { ApplicationCommandOptionType, ButtonStyle } from "discord.js"
import { createButton, createRow } from "../../../functions/discord/components"
import Command from "../../../structures/Command"

// An example of a complete command
export default new Command({
    data: {
        name: "avatar",
        description: "Get user avatar.",
        dmPermission: false,
        options: [
            {
                type: ApplicationCommandOptionType.User,
                name: "target",
                description: "The target user to get avatar.",
                required: false,
            },
        ],
    },
    async run(command) {
        const user = command.options.getUser("target") ?? command.user
        const content = user.displayAvatarURL({ size: 4096 })
        const components = [createRow(createButton("Download", content, ButtonStyle.Link))]

        command.reply({ components, content, ephemeral: true })
    },
})
