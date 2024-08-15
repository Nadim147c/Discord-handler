import { LogStart } from "../functions/log/logger.js"
import ExtendedClient from "../structures/Client.js"
import Event from "../structures/Event.js"

export default new Event("ready", async function (baseClient) {
    const client = baseClient as ExtendedClient // This one just for setting proper type
    LogStart(client)
    globalThis.config.devGuilds.forEach((str) => client.registerCommands(str))
})
