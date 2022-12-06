import { guildLog } from "../functions/log/logger"
import Event from "../structures/Event"

export default new Event("guildCreate", async (guild) => {
    guildLog(guild, "CREATE")
})
