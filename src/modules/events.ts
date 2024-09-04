import type { ClientEvents } from "discord.js"
import { srcDir } from "../dirname.js"
import Print from "../functions/log/Color.js"
import type ExtendedClient from "../structures/Client.js"
import type Event from "../structures/Event.js"

export default async (client: ExtendedClient) => {
    const path = `${srcDir}/events/`

    Print.title("[Module]", "loading Events")
    const files = await client.getFiles(path)

    for await (const file of files) {
        const event = (await client.importFile(file)) as Event<keyof ClientEvents>
        Print.gray("[Event]", event.event)
        client.on(event.event, event.execute)
    }
}
