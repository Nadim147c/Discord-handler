import Command from "../../structures/Command.js"

export default new Command({
    data: {
        name: "ping",
        description: "Get API ping.",
    },
    async run(command) {
        const previous = new Date()
        await command.reply({ content: ":ping_pong:", ephemeral: true })
        const now = new Date()

        const content = [
            `> Message Edit Time: ${now.valueOf() - previous.valueOf()}ms`,
            `> Websocket Ping: ${command.client.ws.ping}ms`,
        ].join("\n")
        await command.editReply(content)
    },
})
