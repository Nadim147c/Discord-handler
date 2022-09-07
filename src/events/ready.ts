import { devGuilds } from "../config"
import { LogStart } from "../functions/log/logger"
import { ExtendedClient } from "../structures/Client"
import { Event } from "../structures/Event"

export default new Event("ready", async (client: ExtendedClient) => {
    LogStart(client)

    devGuilds.forEach(async (guildId) => {
        const guild = await client.guilds.fetch(guildId)
        if (guild) guild.commands.set(Array.from(client.commandData))
    })
})
