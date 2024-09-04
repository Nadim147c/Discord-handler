import { z } from "zod"
import { logError } from "./functions/log/logger.js"
import loadConfig from "./loadConfig.js"
import ExtendedClient from "./structures/Client.js"

await loadConfig()

const envSchema = z.object({ DISCORD: z.string() })

envSchema.parse(process.env)

declare global {
    // biome-ignore lint/style/noNamespace: Add typing to environment
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}
if (global.config.globalErrorHandling) {
    process.on("uncaughtException", (error) => logError(error))
    process.on("uncaughtExceptionMonitor", (error) => logError(error))
}

const client = new ExtendedClient()

client.start()
