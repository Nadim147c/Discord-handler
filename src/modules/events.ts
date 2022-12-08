import { ClientEvents } from "discord.js"
import type ExtendedClient from "../structures/Client"
import type Event from "../structures/Event"

export default async (client: ExtendedClient) => {
    const path = `${__dirname}/../events/`

    const files = await client.getFiles(path)

    const events: Event<keyof ClientEvents>[] = await Promise.all(files.map((file) => client.importFile(file)))

    events.forEach((event) => client.on(event.event, event.execute))
}
