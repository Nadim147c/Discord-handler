import { codeBlock } from "discord.js"
import Command from "../../structures/Command"

export default new Command({
    data: {
        name: "ping",
        description: "Get API ping.",
    },
    async run(command) {
        command.response(codeBlock(command.client.ws.ping.toString()))
    },
})
