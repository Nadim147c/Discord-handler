import { logError } from "../functions/log/logger.js"
import Event from "../structures/Event.js"

export default new Event("error", logError)
