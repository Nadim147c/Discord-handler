import { EmbedBuilder, type EmbedField, codeBlock } from "discord.js"
import Command from "../../../structures/Command.js"
import type { CommandType } from "../../../typings/Commands.js"

// A sub commands of help
export default new Command({
    data: {
        name: "commands",
        description: "Get a list of commands all available commands.",
    },
    async run(command) {
        const commands = [...command.client.commands]

        const categories = Array.from(new Set(commands.map(([, v]) => v.category)))

        const map = ([k]: [string, CommandType]) => `/${k.split("-").join(" ")}`

        const fields: EmbedField[] = categories.map((cate) => {
            const value = codeBlock(
                commands
                    .filter(([, v]) => v.category === cate)
                    .map(map)
                    .join("\n")
            ) as string
            const name = cate as string
            return { value, name, inline: false }
        })

        const embeds = [
            new EmbedBuilder()
                .setColor(globalThis.config.color)
                .setTitle("Help")
                .setDescription("Here is the list of all available commands.")
                .setFields(fields),
        ]

        command.reply({ embeds })
    },
})
