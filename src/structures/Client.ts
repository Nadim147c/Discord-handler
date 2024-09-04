import chalk from "chalk"
import {
    type ApplicationCommand,
    type ApplicationCommandData,
    Client,
    Collection,
    Partials,
} from "discord.js"
import { glob } from "glob"
import { srcDir } from "../dirname.js"
import Print from "../functions/log/Color.js"
import { logError } from "../functions/log/logger.js"
import type { ButtonType } from "../typings/Buttons.js"
import type { CommandType } from "../typings/Commands.js"
import type { ContextMenuType } from "../typings/ContextMenus.js"
import type { ModalType } from "../typings/Modals.js"
import type {
    ChannelSelectMenuType,
    MentionableSelectMenuType,
    RoleSelectMenuType,
    StringSelectMenuType,
    UserSelectMenuType,
} from "../typings/SelectMenus.js"

export default class ExtendedClient<T extends true = true> extends Client<T> {
    constructor() {
        super({
            intents: [
                "Guilds",
                "GuildMembers",
                "GuildMessageReactions",
                "GuildMessages",
                "MessageContent",
            ],
            partials: [Partials.Message, Partials.Channel, Partials.Reaction],
        })
    }

    commands: Collection<string, CommandType> = new Collection()

    buttons: Collection<string, ButtonType> = new Collection()

    modals: Collection<string, ModalType> = new Collection()

    contextMenus: ContextMenuType = { message: new Collection(), user: new Collection() }

    selectMenus = {
        string: new Collection() as Collection<string, StringSelectMenuType>,
        user: new Collection() as Collection<string, UserSelectMenuType>,
        role: new Collection() as Collection<string, RoleSelectMenuType>,
        channel: new Collection() as Collection<string, ChannelSelectMenuType>,
        mentionable: new Collection() as Collection<string, MentionableSelectMenuType>,
    }

    commandData: Set<ApplicationCommandData> = new Set()

    commandTimeout: Collection<string, Collection<string, number>> = new Collection()

    async start() {
        Print.title("Initializing...")
        await this.loadModules()

        Print.title("Loggin to Discord...")
        await this.login(process.env.DISCORD)
    }

    async importFile(path: string) {
        return (await import(path).catch(logError))?.default
    }

    async getFiles(path: string) {
        const match = "/**/**/**/**/*{.js,.ts}"
        const files = await glob(path + match, { windowsPathsNoEscape: true })
        return files
    }

    async loadModules() {
        const files = await this.getFiles(`${srcDir}/modules/`)
        const modules = await Promise.all(files.map((file) => this.importFile(file)))
        for await (const discordModule of modules) await discordModule(this)
    }

    async registerCommands(guildId?: string) {
        const then = async (commands: Collection<string, ApplicationCommand>) => {
            if (guildId) {
                const guild = await this.guilds.fetch(guildId)
                const guildName = chalk.blue(guild.name)
                Print.title(`Registered ${chalk.yellow(commands.size)} commands in ${guildName}.`)
                return
            }
            Print.title(`Registered ${chalk.yellow(commands.size)} commands globally.`)
        }

        if (!guildId) {
            this.application.commands.set(Array.from(this.commandData)).then(then).catch(logError)
            return
        }

        const guild = await this.guilds.fetch(guildId)
        if (guild) guild.commands.set(Array.from(this.commandData)).then(then).catch(logError)
    }
}
