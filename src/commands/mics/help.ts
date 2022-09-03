import { Command } from "../../structures/Command"

export default new Command({
    data: {
        name: "help",
        description: "Help!",
    },
    async run(command) {
        return command.warn("This bot is in development.")
    },
})
