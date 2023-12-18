/* eslint-disable @typescript-eslint/no-namespace */
import { config } from "dotenv"
import { z } from "zod"
import ExtendedClient from "./structures/Client"

config()

const envSchema = z.object({ DISCORD: z.string() })

envSchema.parse(process.env)

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}

const client = new ExtendedClient()

client.start()
