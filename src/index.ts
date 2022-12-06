import { config } from "dotenv"
import ExtendedClient from "./structures/Client"

config()

// eslint-disable-next-line import/prefer-default-export
export const client = new ExtendedClient()

client.start()
