import chalk from "chalk"
import { type DateResolvable, EmbedBuilder, type Guild, WebhookClient } from "discord.js"
import type ExtendedClient from "../../structures/Client.js"
import { getDynamicTime } from "../discord/getDynamicTime.js"
import Print from "./Color.js"

const detailedTime = (date: DateResolvable | null | undefined) =>
    date ? `${getDynamicTime(date, "LONG_TIME_AND_DATE")}  ${getDynamicTime(date, "RELATIVE")}` : ""

export const coloredLog = (text: string, color: string) => {
    console.log(chalk.hex(color)(text))
}
export const LogFail = (str: string | Error) => {
    coloredLog(typeof str === "string" ? str : str.message, "#f00")
}

export const LogStart = (client: ExtendedClient) => {
    Print.title(`[Ready] ${client.user.username}:${client.user.id}.`)
    if (!process.env.LOGIN) return
    const webhook = new WebhookClient({ url: process.env.LOGIN })

    const { guilds, user } = client

    const totalMembers = guilds.cache.reduce((a, { memberCount }) => a + memberCount, 0)
    const guildCount = guilds.cache.size

    const description = [
        `Time: ${detailedTime(new Date())}`,
        `Members: ${totalMembers}`,
        `Guilds: ${guildCount}`,
        `Client: [${user.username}](https://discord.com/developers/applications/${user.id}/bot)`,
    ].join("\n")

    const embeds = [
        new EmbedBuilder()
            .setTitle("Login")
            .setColor("Green")
            .setDescription(description)
            .setTimestamp(),
    ]

    const avatarURL = client.user.displayAvatarURL()

    webhook.send({ embeds, avatarURL }).catch(console.error)
}

export const logError = (error: Error | unknown) => {
    console.error(error)
    if (!process.env.ERROR) return
    if (error instanceof Error && error.message === "Missing Permissions") return

    const webhook = new WebhookClient({ url: process.env.ERROR })

    const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle(error instanceof Error ? error.name : "Unknown Error")
        .setTimestamp()

    if (error instanceof Error && error.stack) {
        const des = error.stack
            .split("\n")
            .map((x) => `\`\`\`${x.trim()}\`\`\``)
            .join("\n")

        embed.setDescription(des)
    }

    const embeds = [embed]

    webhook.send({ embeds }).catch(console.error)
}

export const guildLog = (guild: Guild, event: "CREATE" | "DELETE") => {
    event === "CREATE"
        ? Print.title(`Guild Create: ${guild.name}`)
        : LogFail(`Guild Remove: ${guild.name}`)

    if (!process.env.GUILDS) return
    const webhook = new WebhookClient({ url: process.env.GUILDS })
    const description = `Name: ${guild.name}\nMembers: ${guild.memberCount}\nCreate: ${detailedTime(
        guild?.members?.me?.joinedAt
    )}\nRemove: ${event === "DELETE" ? detailedTime(new Date()) : "❌"}
    `

    const embeds = [
        new EmbedBuilder()
            .setColor(event === "CREATE" ? "Green" : "Red")
            .setDescription(description)
            .setAuthor({ name: guild.name })
            .setThumbnail(guild.iconURL())
            .setTimestamp(),
    ]

    const username = event === "CREATE" ? "Guild Create" : "Guild Delete"

    webhook.send({ embeds, username }).catch(console.error)
}
