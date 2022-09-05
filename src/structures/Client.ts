import { ApplicationCommandData, Client, Collection } from "discord.js"
import { readdirSync, statSync } from "fs"
import { CommandType } from "../typings/Commands"
import mongoose from "mongoose"
import { ButtonType } from "../typings/Buttons"
import { SelectMenuType } from "../typings/SelectMenus"
import { ModalType } from "../typings/Modals"

export class ExtendedClient extends Client {
    constructor() {
        super({ intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"], partials: [] })
    }

    commands: Collection<string, CommandType> = new Collection()
    buttons: Collection<string, ButtonType> = new Collection()
    selectMenus: Collection<string, SelectMenuType> = new Collection()
    modals: Collection<string, ModalType> = new Collection()

    commandData: Set<ApplicationCommandData> = new Set()
    commandTimeout: Collection<string, Collection<string, number>> = new Collection()

    async start() {
        await this.loadModules()

        this.login(process.env.DISCORD)

        mongoose.connect(process.env.MONGODB)
    }

    async importFile(path: string) {
        // eslint-disable-next-line no-console
        return (await import(path).catch(console.error))?.default
    }

    async isDir(path: string) {
        return statSync(path).isDirectory()
    }

    async loadModules() {
        const filter = (file: string) => file.endsWith(".ts") || file.endsWith(".js")
        const modules = readdirSync(`${__dirname}/../modules/`).filter(filter)
        modules.forEach(async (file) => (await this.importFile(`${__dirname}/../modules/${file}`))(this))
    }
}
