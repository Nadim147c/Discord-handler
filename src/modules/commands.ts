/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { ApplicationCommandOption, ApplicationCommandOptionType, ChatInputApplicationCommandData } from "discord.js"
import { readdirSync } from "fs"
import ExtendedClient from "../structures/Client"
import { CommandType } from "../typings/Commands"

export default async (client: ExtendedClient) => {
    const path = `${__dirname}/../commands`
    readdirSync(path).forEach(async (dir: string) => {
        const filter = (file: string) => file.endsWith(".ts") || file.endsWith(".js")
        const files = readdirSync(`${path}/${dir}`)
        const commandFiles = files

        for (const file of commandFiles) {
            const basePath = `${path}/${dir}/${file}`

            let data: ChatInputApplicationCommandData = {
                name: file,
                description: `Commands related to ${file}`,
                options: [],
            }

            const { Subcommand, SubcommandGroup } = ApplicationCommandOptionType

            if (!filter(basePath) && (await client.isDir(basePath))) {
                const groupFiles = readdirSync(basePath)

                for (const group of groupFiles) {
                    const groupPath = `${basePath}/${group}`

                    let groupData: ApplicationCommandOption = {
                        type: SubcommandGroup,
                        name: group,
                        description: `${group} related commands.`,
                        options: [],
                    }

                    if (!filter(groupPath) && (await client.isDir(basePath))) {
                        const subCommandFiles = readdirSync(groupPath)

                        for (const sub of subCommandFiles) {
                            const subCommandPath = `${groupPath}/${sub}`
                            const command: CommandType = await client.importFile(subCommandPath)

                            const name = `${file}-${group}-${command.data.name}`

                            command.category = dir

                            client.commands.set(name, command)

                            groupData.options.push(Object.assign(command.data, { type: Subcommand }))
                        }
                    } else {
                        const command: CommandType = await client.importFile(groupPath)

                        command.category = dir

                        const name = `${file}-${command.data.name}`

                        client.commands.set(name, command)

                        groupData = Object.assign(command.data, { type: Subcommand })
                    }

                    data.options?.push(groupData)
                }
            } else {
                // eslint-disable-next-line no-await-in-loop
                const command: CommandType = await client.importFile(basePath)

                command.category = dir

                client.commands.set(command.data.name, command)

                data = command.data
            }

            client.commandData.add(data)
        }
    })
}
