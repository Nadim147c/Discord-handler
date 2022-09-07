import { ClientEvents } from "discord.js"
import { readdirSync } from "fs"
import { ExtendedClient } from "../structures/Client"
import { Event } from "../structures/Event"

export default async (client: ExtendedClient) => {
    const pathFiles = `${__dirname}/../events/`
    const filter = (file: string) => file.endsWith(".ts") || file.endsWith(".js")

    async function starter(path: string) {
        readdirSync(path).forEach(async (file: string) => {
            if (!filter(`${path}/${file}`) && (await client.isDir(`${path}/${file}`))) return starter(`${path}/${file}`)
            const event: Event<keyof ClientEvents> = await client.importFile(`${path}/${file}`)
            client.on(event.event, event.execute)
        })
    }

    starter(pathFiles)
}
