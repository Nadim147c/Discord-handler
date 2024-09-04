import { EmbedBuilder, type EmbedField, codeBlock } from "discord.js"
import { string } from "zod"
import Command from "../../../../structures/Command.js"
import type { CommandType } from "../../../../typings/Commands.js"

// A sub commands of help
export default new Command({
    data: {
        name: "list",
        description: "Get a list of all available commands.",
    },
    async run(command) {
        const commands = Array.from(command.client.commands)

        if (commands.length < 1) return await command.reply("There are no commands available")

        type SimplifiedHelpCommand = { name: string; body: CommandType }
        const helpMap = new Map<string, SimplifiedHelpCommand[]>()
        for (const [name, body] of commands) {
            const commandHelp = { name, body }

            // biome-ignore lint/style/noNonNullAssertion: Categories are set during command modules register
            const category = body.category!

            const existingCommandHelp = helpMap.get(category)
            if (Array.isArray(existingCommandHelp)) {
                helpMap.set(category, [...existingCommandHelp, commandHelp])
            } else {
                helpMap.set(category, [commandHelp])
            }
        }

        const helpArr = Array.from(helpMap).sort(([categoryA], [categoryB]) => {
            return categoryA.localeCompare(categoryB)
        })

        let content = "## List of all available commands"
        for (const [category, commands] of helpArr) {
            content += `\n### ${category}`
            for (const cmd of commands.toSorted((a, b) => a.name.localeCompare(b.name))) {
                content += `\n\`/${cmd.name.replace("-", " ")}\`: ${cmd.body.data.description}`
            }
        }

        await command.reply(content)
    },
})
