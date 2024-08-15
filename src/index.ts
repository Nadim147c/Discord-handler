/* eslint-disable @typescript-eslint/no-namespace */
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
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}

const client = new ExtendedClient()

client.start()
