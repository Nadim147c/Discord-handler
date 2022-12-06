import chalk from "chalk"
import { DateResolvable, EmbedBuilder, Guild, WebhookClient } from "discord.js"
import type ExtendedClient from "../../structures/Client"
import { getDynamicTime } from "../discord/getDynamicTime"

const detailedTime = (date: DateResolvable) =>
    `${getDynamicTime(date, "LONG_TIME_AND_DATE")}  ${getDynamicTime(date, "RELATIVE")}`

// eslint-disable-next-line no-console
export const coloredLog = (str: string, color: string) => console.log(chalk.hex(color)(str))
export const logSuccess = (str: string) => coloredLog(str, "#0f0")
export const LogFail = (str: string | Error) => coloredLog(typeof str === "string" ? str : str.message, "#f00")

export const LogStart = (client: ExtendedClient) => {
    logSuccess(`${client.user.username} is ready.`)
    if (!process.env.LOGIN) return
    const webhook = new WebhookClient({ url: process.env.LOGIN })

    const { guilds, user } = client

    const totalMembers = guilds.cache.reduce((a, { memberCount }) => a + memberCount, 0)
    const guildCount = guilds.cache.size

    const description = `Time: ${detailedTime(new Date())}\nMembers: ${totalMembers}\nGuilds: ${guildCount}\nClient: [${
        user.username
    }](https://discord.com/developers/applications/${user.id}/bot)`

    const embeds = [new EmbedBuilder().setTitle("Login").setColor("Green").setDescription(description).setTimestamp()]

    const avatarURL = client.user.displayAvatarURL()

    // eslint-disable-next-line no-console
    webhook.send({ embeds, avatarURL }).catch(console.error)
}

export const logError = (error: Error) => {
    // eslint-disable-next-line no-console
    console.error(error)
    if (!process.env.ERROR) return
    if (error.message === "Missing Permissions") return

    const webhook = new WebhookClient({ url: process.env.ERROR })

    const embed = new EmbedBuilder().setColor("Red").setTitle(error.name).setTimestamp()
    if (error.stack) {
        const des = error.stack
            .split("\n")
            .map((x) => `\`\`\`${x.trim()}\`\`\``)
            .join("\n")

        embed.setDescription(des)
    }

    const embeds = [embed]

    // eslint-disable-next-line no-console
    webhook.send({ embeds }).catch(console.error)
}

export const guildLog = (guild: Guild, event: "CREATE" | "DELETE") => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event === "CREATE" ? logSuccess(`Guild Create: ${guild.name}`) : LogFail(`Guild Remove: ${guild.name}`)

    if (!process.env.GUILDS) return
    const webhook = new WebhookClient({ url: process.env.GUILDS })
    const description = `Name: ${guild.name}\nMembers: ${guild.memberCount}\nCreate: ${detailedTime(
        guild.members.me.joinedAt,
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

    // eslint-disable-next-line no-console
    webhook.send({ embeds, username }).catch(console.error)
}
