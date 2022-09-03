import { ApplicationCommandOptionType, AttachmentBuilder } from "discord.js"
import { Command } from "../../../../structures/Command"

export default new Command({
    data: {
        name: "avatar",
        description: "Get user avatar",
        options: [
            {
                type: ApplicationCommandOptionType.User,
                name: "user",
                description: "Target User.",
            },
        ],
    },
    ephemeral: true,
    async run(command) {
        const user = command.options.getUser("user") ?? command.user
        const files = [new AttachmentBuilder(user.displayAvatarURL({ size: 4096 }))]
        command.followUp({ files })
    },
})
