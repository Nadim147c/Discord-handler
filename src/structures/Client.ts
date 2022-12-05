import { ApplicationCommand, ApplicationCommandData, Client, Collection, Partials } from "discord.js"
import { readdirSync, statSync } from "fs"
import { CommandType } from "../typings/Commands"
import { ButtonType } from "../typings/Buttons"
import {
    ChannelSelectMenuType,
    RoleSelectMenuType,
    StringSelectMenuType,
    UserSelectMenuType,
} from "../typings/SelectMenus"
import { ModalType } from "../typings/Modals"
import { TriggersType } from "../typings/Triggers"
import { ContextMenuType } from "../typings/ContextMenus"
import { logError, logSuccess } from "../functions/log/logger"

export class ExtendedClient extends Client {
    constructor() {
        super({
            intents: ["Guilds", "GuildMembers", "GuildMessageReactions", "GuildMessages", "MessageContent"],
            partials: [Partials.Message, Partials.Channel, Partials.Reaction],
        })
    }

    commands: Collection<string, CommandType> = new Collection()
    buttons: Collection<string, ButtonType> = new Collection()
    modals: Collection<string, ModalType> = new Collection()
    triggers: TriggersType = { message: new Collection(), reaction: new Collection() }
    contextMenus: ContextMenuType = { message: new Collection(), user: new Collection() }

    selectMenus = {
        string: new Collection() as Collection<string, StringSelectMenuType>,
        user: new Collection() as Collection<string, UserSelectMenuType>,
        role: new Collection() as Collection<string, RoleSelectMenuType>,
        channel: new Collection() as Collection<string, ChannelSelectMenuType>,
    }

    commandData: Set<ApplicationCommandData> = new Set()
    commandTimeout: Collection<string, Collection<string, number>> = new Collection()

    async start() {
        await this.loadModules()

        this.login(process.env.DISCORD)
    }

    async importFile(path: string) {
        return (await import(path).catch(logError))?.default
    }

    async isDir(path: string) {
        try {
            return statSync(path).isDirectory()
        } catch (error) {
            return false
        }
    }

    async loadModules() {
        const filter = (file: string) => file.endsWith(".ts") || file.endsWith(".js")
        const modules = readdirSync(`${__dirname}/../modules/`).filter(filter)
        modules.forEach(async (file) => (await this.importFile(`${__dirname}/../modules/${file}`))(this))
    }

    async registerCommands(guildId?: string) {
        const then = (commands: Collection<string, ApplicationCommand>) => {
            const guild = commands.first().guild ? ` in ${commands.first().guild.name}` : ""
            logSuccess(`Registered ${commands.size} commands${guild}.`)
        }

        if (!guildId) this.application.commands.set(Array.from(this.commandData)).then(then).catch(logError)

        const guild = await this.guilds.fetch(guildId)
        if (guild) guild.commands.set(Array.from(this.commandData)).then(then).catch(logError)
    }
}
