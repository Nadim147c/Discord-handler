import { LogStart } from "../functions/log/logger.js"
import type ExtendedClient from "../structures/Client.js"
import Event from "../structures/Event.js"

export default new Event("ready", async (baseClient) => {
    // HACK: This one just for setting proper type
    const client = baseClient as ExtendedClient
    LogStart(client)

    for (const guildId of global.config.devGuilds) {
        try {
            await client.registerCommands(guildId)
        } catch (error) {
            console.error(error)
        }
    }
})
