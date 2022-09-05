import { EmbedBuilder, EmbedField } from "discord.js"
import { color } from "../../../config"
import { Command } from "../../../structures/Command"
import { CommandType } from "../../../typings/Commands"

// A sub commands of help
export default new Command({
    data: {
        name: "commands",
        description: "Get a list of commands all available commands.",
    },
    async run(command) {
        const commands = [...command.client.commands]

        const categories = Array.from(new Set(commands.map(([, v]) => v.category)))

        const map = ([k]: [string, CommandType]) => `\`${k.split("-").join(" ")}\``

        const fields: EmbedField[] = categories.map((cate) => {
            const value = commands
                .filter(([, v]) => v.category === cate)
                .map(map)
                .join(", ")
            const name = cate
            return { value, name, inline: false }
        })

        const embeds = [
            new EmbedBuilder()
                .setColor(color)
                .setTitle("Help")
                .setDescription("Here is the list of all available commands.")
                .setFields(fields),
        ]

        command.reply({ embeds, ephemeral: true })
    },
})
