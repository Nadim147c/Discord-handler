import {
    type ApplicationCommandSubGroupData,
    ApplicationCommandType,
    type ChatInputApplicationCommandData,
    Collection,
    ApplicationCommandOptionType as OptionType,
} from "discord.js"
import { glob } from "glob"
import { z } from "zod"
import { srcDir } from "../dirname.js"
import Print from "../functions/log/Color.js"
import type ExtendedClient from "../structures/Client.js"
import type { CommandType } from "../typings/Commands.js"

type CommandData = Collection<string, ChatInputApplicationCommandData>

const commandPath = `${srcDir}/commands/`

type Mutable<T> = { -readonly [P in keyof T]: T[P] }

const nameRegex = /^[\-_a-zA-Z0-9\u0900-\u097F\u0E00-\u0E7F]{1,32}$/u
const infoSchema = z.object({
    path: z.string(),
    category: z.string(),
    command: z.string().regex(nameRegex),
    subcommandGroup: z.string().regex(nameRegex).optional(),
    subcommand: z.string().regex(nameRegex).optional(),
})

type CommandPathInfo = z.infer<typeof infoSchema>

function extractInfoFromPath(inputPath: string) {
    const dirnameLength = commandPath.split("/").filter(Boolean).length

    const pieces = inputPath
        .substring(0, inputPath.length - 3)
        .split("/")
        .filter(Boolean)
        .slice(dirnameLength)

    const data = {
        path: inputPath,
        category: pieces.at(0),
        command: pieces.at(1),
        subcommandGroup: pieces.at(2),
        subcommand: pieces.at(3),
    } as CommandPathInfo

    const zodParse = infoSchema.safeParse(data)

    if (!zodParse.success) {
        console.error(zodParse.error)
        process.exit(1)
    }

    return zodParse.data
}

const getBaseCmdData = (name: string): ChatInputApplicationCommandData => {
    return structuredClone({
        name,
        type: ApplicationCommandType.ChatInput,
        description: `Commands related to ${name}.`,
        options: [],
    })
}

const getSubCommandGroupData = (name: string): ApplicationCommandSubGroupData => {
    return structuredClone({
        name,
        type: OptionType.SubcommandGroup,
        description: `Commands related to ${name}.`,
        options: [],
    })
}

type MutableCommandDataOptions = Mutable<NonNullable<ChatInputApplicationCommandData["options"]>>
type MutableSubGroupDataOptions = Mutable<NonNullable<ApplicationCommandSubGroupData["options"]>>

function setCommandData(info: CommandPathInfo, module: CommandType, collection: CommandData) {
    let baseCommandData = collection.get(info.command ?? info.subcommandGroup ?? info.subcommand)

    if (info.subcommand) {
        if (!baseCommandData) baseCommandData = getBaseCmdData(info.command)
        const options = (baseCommandData.options ?? []) as MutableCommandDataOptions

        let subcommandGroupData = options.find(
            (cmd) => cmd.name === info.subcommandGroup
        ) as ApplicationCommandSubGroupData

        if (!subcommandGroupData) {
            subcommandGroupData = getSubCommandGroupData(info.subcommandGroup ?? "")
            options.push(subcommandGroupData)
        }

        const subcommandData = subcommandGroupData.options.find(
            (option) => option.name === module.data.name
        )

        if (!subcommandData) {
            const groupOptions = (subcommandGroupData.options ?? []) as MutableSubGroupDataOptions
            groupOptions.push(Object.assign(module.data, { type: OptionType.Subcommand }))
        }

        collection.set(info.command, baseCommandData)
    } else if (info.subcommandGroup) {
        if (!baseCommandData) baseCommandData = getBaseCmdData(info.command)

        const options = (baseCommandData.options ?? []) as MutableCommandDataOptions

        const subcommand = options.find((cmd) => cmd.name === module.data.name)
        if (!subcommand) options.push(Object.assign(module.data, { type: OptionType.Subcommand }))

        collection.set(info.command, baseCommandData)
    } else {
        if (baseCommandData) return

        collection.set(info.command, module.data)
    }
}

export default async (client: ExtendedClient) => {
    Print.title("[Module]", "loading Commands")
    const commandDataCollection: CommandData = new Collection()

    const files = await glob(`${commandPath}**/**/**/*{.js,.ts}`, { windowsPathsNoEscape: true })

    for await (const file of files) {
        const module = (await client.importFile(file)) as CommandType
        const pathInfo = extractInfoFromPath(file)

        module.category = pathInfo.category

        const commandParts = [
            pathInfo.command,
            pathInfo.subcommandGroup,
            pathInfo.subcommand,
        ].filter(Boolean)
        const identifier = commandParts.join("-")

        Print.gray("[Command]", `/${commandParts.join(" ")}`)

        client.commands.set(identifier, module)

        setCommandData(pathInfo, module, commandDataCollection)
    }

    client.commandData = new Set(commandDataCollection.values())
}
