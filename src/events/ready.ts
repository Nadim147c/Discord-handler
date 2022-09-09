import { devGuilds } from "../config"
import { LogStart } from "../functions/log/logger"
import { ExtendedClient } from "../structures/Client"
import { Event } from "../structures/Event"

export default new Event("ready", async (client: ExtendedClient) => {
    LogStart(client)
    devGuilds.forEach((str) => client.registerCommands(str))
})
