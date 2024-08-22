/* eslint-disable no-unused-vars */
import type { ClientEvents } from "discord.js"

export default class Event<Key extends keyof ClientEvents> {
    constructor(
        public event: Key,
        public execute: (...args: ClientEvents[Key]) => unknown
    ) {}
}
