import chalk from "chalk"
import { readFile, writeFile } from "fs/promises"
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
    // eslint-disable-next-line no-var
    var config: Global["config"]
}

export {}

export default async function loadConfig() {
    try {
        const configData = await readFile("./config.toml", "utf8")

        let tomlData: ReturnType<typeof TOML.parse>
        try {
            tomlData = TOML.parse(configData)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(chalk.red(chalk.bold("Invalid toml configuration")))
            logError(error as Error)
            process.exit(1)
        }

        const config = configSchema.safeParse(tomlData)

        if (config.success) {
            globalThis.config = config.data
        } else {
            // eslint-disable-next-line no-console
            console.log(chalk.red(chalk.bold("Invalid toml configuration")))
            logError(config.error)
            process.exit(1)
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
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
