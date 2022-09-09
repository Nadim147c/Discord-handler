import { ApplicationCommandOptionType } from "discord.js"
import { Command } from "../../../../structures/Command"
import wordList from "../../../../../assets/data/words.json"
import { titleCase } from "../../../../functions/string/normalize"

export default new Command({
    data: {
        name: "autocomplete",
        description: "autocomplete example",
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: "input",
                description: "Type anything for autocomplete.",
                autocomplete: true,
                required: true,
            },
        ],
    },
    dev: true,
    async autocomplete(interaction, focused) {
        const inputs = focused.split(/ +/g)
        inputs.pop()
        const last = focused.split(/ +/g)[inputs.length].toLowerCase()
        const words = wordList.filter((word) => word.startsWith(last))
        return words.map((word) => ({
            name: titleCase(inputs.join(" ") + ` ${word}`),
            value: titleCase(inputs.join(" ") + ` ${word}`),
        }))
    },
    async run(command) {
        command.response(`You typed:\n\`\`\`${command.options.getString("input")}\`\`\``)
    },
})
