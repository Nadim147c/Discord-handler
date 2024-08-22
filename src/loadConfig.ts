import { readFile, writeFile } from "node:fs/promises"
import chalk from "chalk"
import TOML from "smol-toml"
import { z } from "zod"
import { logError } from "./functions/log/logger.js"

const configSchema = z
    .object({
        devGuilds: z.array(z.string()),
        developers: z.array(z.string()),
        testers: z.array(z.string()),
        commandTimeout: z.number(),
        color: z.number(),
        colors: z.object({
            default: z.number(),
            warn: z.number(),
            error: z.number(),
        }),
    })
    .strict()

declare global {
    interface Global {
        config: z.infer<typeof configSchema>
    }
    var config: Global["config"]
}

export default async function loadConfig() {
    try {
        const configData = await readFile("./config.toml", "utf8")

        let tomlData: ReturnType<typeof TOML.parse>
        try {
            tomlData = TOML.parse(configData)
        } catch (error) {
            logError(error as Error)
            process.exit(1)
        }

        const config = configSchema.safeParse(tomlData)

        if (config.success) {
            globalThis.config = config.data
        } else {
            logError(config.error)
            process.exit(1)
        }
    } catch (_error) {
        const data = TOML.stringify({
            devGuilds: [],
            developers: [],
            testers: [],
            commandTimeout: 5_000,
            color: 0x2f3136,
            colors: {
                default: 0x2f3136,
                warn: 0xffff00,
                error: 0xff0000,
            },
        })

        await writeFile("./config.toml", data, "utf8")
    }
}
