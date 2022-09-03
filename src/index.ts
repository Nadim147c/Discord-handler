import { config } from "dotenv"
import { ExtendedClient } from "./structures/Client"
config()

export const client = new ExtendedClient()

client.start()
