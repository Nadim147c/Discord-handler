import { ApplicationCommand, ApplicationCommandData, Client, Collection, Partials } from "discord.js"
import { glob } from "glob"
import { promisify } from "util"
import type { CommandType } from "../typings/Commands"
import type { ButtonType } from "../typings/Buttons"
import type {
    ChannelSelectMenuType,
    MentionableSelectMenuType,
    RoleSelectMenuType,
    StringSelectMenuType,
    UserSelectMenuType,
} from "../typings/SelectMenus"
import type { ModalType } from "../typings/Modals"
import type { TriggersType } from "../typings/Triggers"
import type { ContextMenuType } from "../typings/ContextMenus"
import { logError, logSuccess } from "../functions/log/logger"

export default class ExtendedClient extends Client {
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
        mentionable: new Collection() as Collection<string, MentionableSelectMenuType>,
    }

    commandData: Set<ApplicationCommandData> = new Set()

    commandTimeout: Collection<string, Collection<string, number>> = new Collection()

    globPromise = promisify(glob)

    async start() {
        await this.loadModules()

        this.login(process.env.DISCORD)
    }

    // eslint-disable-next-line class-methods-use-this
    async importFile(path: string) {
        return (await import(path).catch(logError))?.default
    }

    async getFiles(path: string) {
        const match = "/**/**/**/**/*{.js,.ts}"
        const files = await this.globPromise(path + match, { windowsPathsNoEscape: true })
        return files
    }

    async loadModules() {
        const files = await this.getFiles(`${__dirname}/../modules/`)
        const modules = await Promise.all(files.map((file) => this.importFile(file)))
        modules.forEach((module) => module(this))
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
