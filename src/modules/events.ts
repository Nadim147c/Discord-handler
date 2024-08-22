import type { ClientEvents } from "discord.js"
import { srcDir } from "../dirname.js"
import type ExtendedClient from "../structures/Client.js"
import type Event from "../structures/Event.js"

export default async (client: ExtendedClient) => {
    const path = `${srcDir}/events/`

    const files = await client.getFiles(path)

    const events: Event<keyof ClientEvents>[] = await Promise.all(
        files.map((file) => client.importFile(file))
    )

    for (const event of events) client.on(event.event, event.execute)
}
