import { guildLog } from "../functions/log/logger.js"
import Event from "../structures/Event.js"

export default new Event("guildCreate", async (guild) => {
    guildLog(guild, "CREATE")
})
