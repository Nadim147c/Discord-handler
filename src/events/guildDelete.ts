import { guildLog } from "../functions/log/logger.js"
import Event from "../structures/Event.js"

export default new Event("guildDelete", async (guild) => {
    guildLog(guild, "DELETE")
})
