import {
    ApplicationCommandOptionType as OptionType,
    ApplicationCommandSubGroupData,
    ApplicationCommandType,
    ChatInputApplicationCommandData,
    Collection,
} from "discord.js"
import glob from "glob"
import type ExtendedClient from "../structures/Client"
import type { CommandType } from "../typings/Commands"

type CommandPathInfo = {
    path: string
    file: string
    category: string
    subName: string
    rootName: string
}

type CommandData = Collection<string, ChatInputApplicationCommandData>

const path = `${__dirname}/../commands/`

function extractInfoFromPath(inputPath: string): CommandPathInfo {
    const dirnameLength = __dirname.split("/").length

    const pieces = inputPath.split("/").slice(dirnameLength)

    if (pieces.length < 2)
        // eslint-disable-next-line max-len, @typescript-eslint/no-throw-literal
        throw "Invalid files structure. See the docs: 'https://github.com/Nadim147c/Discord-handler#subcommands-and-files-structure'"

    const info: CommandPathInfo = {
        path: inputPath,
        category: pieces.shift(),
        file: pieces.pop(),
        subName: pieces.pop(),
        rootName: pieces.pop(),
    }

    return info
}

const defaultBaseCommandData = (name: string): ChatInputApplicationCommandData => ({
    name,
    type: ApplicationCommandType.ChatInput,
    description: `Commands related to ${name}.`,
    options: [],
})

const defaultSubCommandData = (name: string): ApplicationCommandSubGroupData => ({
    name,
    type: OptionType.SubcommandGroup,
    description: `Commands related to ${name}.`,
    options: [],
})

function setCommandData(info: CommandPathInfo, module: CommandType, collection: CommandData) {
    let commandData = collection.get(info.rootName)

    if (info.rootName) {
        if (!commandData) commandData = defaultBaseCommandData(info.rootName)

        let groupData = commandData.options.find((CMD) => CMD.name === info.subName) as ApplicationCommandSubGroupData

        if (!groupData) {
            groupData = defaultSubCommandData(info.subName)
            commandData.options.push(groupData)
        }

        const subcommand = groupData.options.find((x) => x.name === module.data.name)

        if (!subcommand) groupData.options.push(Object.assign(module.data, { type: OptionType.Subcommand }))

        collection.set(info.rootName, commandData)

        return
    }

    if (info.subName) {
        if (!commandData) commandData = defaultBaseCommandData(info.subName)

        const subcommand = commandData.options.find((x) => x.name === module.data.name)

        if (!subcommand) commandData.options.push(Object.assign(module.data, { type: OptionType.Subcommand }))

        collection.set(info.subName, commandData)

        return
    }

    if (commandData) return

    collection.set(module.data.name, module.data)
}

export default async (client: ExtendedClient) => {
    async function registerCommands(_, files: string[]) {
        const commandDataCollection: CommandData = new Collection()
        const pathInfos = files.map((file) => extractInfoFromPath(file))

        const modules: CommandType[] = await Promise.all(pathInfos.map((info) => client.importFile(info.path)))

        for (let i = 0; i < modules.length; i++) {
            const pathInfo = pathInfos[i]
            const module = modules[i]

            module.category = pathInfo.category

            const identifier = [pathInfo.rootName, pathInfo.subName, module.data.name].filter((x) => x).join("-")

            client.commands.set(identifier, module)

            setCommandData(pathInfo, module, commandDataCollection)
        }

        commandDataCollection.forEach((x) => client.commandData.add(x))
    }

    glob(`${path}**/**/**/*{.js,.ts}`, { windowsPathsNoEscape: true }, registerCommands)
}
