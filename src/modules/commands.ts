import {
    ApplicationCommandSubGroupData,
    ApplicationCommandType,
    ChatInputApplicationCommandData,
    Collection,
    ApplicationCommandOptionType as OptionType,
} from "discord.js"
import { glob } from "glob"
import { srcDir } from "../dirname.cjs"
import ExtendedClient from "../structures/Client.js"
import type { CommandType } from "../typings/Commands.js"

type CommandPathInfo = {
    path: string
    category: string
    baseName: string
    midName: string
    topName: string
}

type CommandData = Collection<string, ChatInputApplicationCommandData>

const path = `${srcDir}/commands/`

type Mutable<T> = {
    -readonly [P in keyof T]: T[P]
}

function extractInfoFromPath(inputPath: string): CommandPathInfo {
    const dirnameLength = srcDir.split("/").length + 1

    const pieces = inputPath.split("/").slice(dirnameLength)

    if (pieces.length < 2) throw "Invalid files structure."

    const info: CommandPathInfo = {
        path: inputPath,
        category: pieces.shift()!,
        baseName: pieces.pop()!,
        midName: pieces.pop()!,
        topName: pieces.pop()!,
    }

    return info
}

const getBaseCmdData = (name: string): ChatInputApplicationCommandData => ({
    name,
    type: ApplicationCommandType.ChatInput,
    description: `Commands related to ${name}.`,
    options: [],
})

const getSubCmdGroupData = (name: string): ApplicationCommandSubGroupData => ({
    name,
    type: OptionType.SubcommandGroup,
    description: `Commands related to ${name}.`,
    options: [],
})

function setCommandData(info: CommandPathInfo, module: CommandType, collection: CommandData) {
    let topLevelCmdData = collection.get(info.topName ?? info.midName ?? info.baseName)

    if (info.topName) {
        if (!topLevelCmdData) topLevelCmdData = getBaseCmdData(info.topName)
        const options = (topLevelCmdData.options as Mutable<typeof topLevelCmdData.options>) ?? []

        let midCmdData = options.find(
            (cmd) => cmd.name === info.midName,
        ) as ApplicationCommandSubGroupData

        if (!midCmdData) {
            midCmdData = getSubCmdGroupData(info.midName)
            options.push(midCmdData)
        }

        const subcommand = midCmdData.options.find((option) => option.name === module.data.name)

        if (!subcommand) options.push(Object.assign(module.data, { type: OptionType.Subcommand }))

        topLevelCmdData.options = options

        collection.set(info.topName, topLevelCmdData)
    } else if (info.midName) {
        if (!topLevelCmdData) topLevelCmdData = getBaseCmdData(info.midName)

        const options = (topLevelCmdData.options as Mutable<typeof topLevelCmdData.options>) ?? []

        const baseCmd = options.find((cmd) => cmd.name === module.data.name)

        if (!baseCmd) options.push(Object.assign(module.data, { type: OptionType.Subcommand }))

        topLevelCmdData.options = options

        collection.set(info.midName, topLevelCmdData)
    } else {
        if (topLevelCmdData) return

        collection.set(module.data.name, module.data)
    }
}

export default async (client: ExtendedClient) => {
    const commandDataCollection: CommandData = new Collection()

    async function registerCommands(files: string[]) {
        const pathInfos = files.map((file) => extractInfoFromPath(file))

        const modules: CommandType[] = await Promise.all(
            pathInfos.map((info) => client.importFile(info.path)),
        )

        for (let i = 0; i < modules.length; i++) {
            const pathInfo = pathInfos[i]!
            const module = modules[i]!

            module.category = pathInfo.category

            const identifier = [pathInfo.topName, pathInfo.midName, module.data.name]
                .filter(Boolean)
                .join("-")

            client.commands.set(identifier, module)

            setCommandData(pathInfo, module, commandDataCollection)
        }

        commandDataCollection.forEach((x) => {
            client.commandData.add(x)
        })
    }

    const files = await glob(`${path}**/**/**/*{.js,.ts}`, { windowsPathsNoEscape: true })
    registerCommands(files)
}
