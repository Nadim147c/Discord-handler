/* eslint-disable no-unused-vars */
import { ClientEvents } from "discord.js"

export default class Event<Key extends keyof ClientEvents> {
    constructor(
        public event: Key,
        public execute: (...args: ClientEvents[Key]) => unknown,
    ) {}
}
