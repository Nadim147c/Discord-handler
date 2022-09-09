import { ClientEvents } from "discord.js"

export class Event<Key extends keyof ClientEvents> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(public event: Key, public execute: (...args: ClientEvents[Key]) => any) {}
}
