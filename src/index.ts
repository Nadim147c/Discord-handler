import { config } from "dotenv"
import { z } from "zod"
import loadConfig from "./loadConfig.js"
import ExtendedClient from "./structures/Client.js"

config()

await loadConfig()

const envSchema = z.object({
    DISCORD: z.string(),
})

envSchema.parse(process.env)

declare global {
    // biome-ignore lint/style/noNamespace: <explanation>
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}

const client = new ExtendedClient()

client.start()
