import {
    ActionRowBuilder,
    ChannelSelectMenuBuilder,
    RoleSelectMenuBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    UserSelectMenuBuilder,
} from "discord.js"
import Command from "../../../../structures/Command"

export default new Command({
    data: {
        name: "selectmenu",
        description: "Select menu example",
    },
    dev: true,
    async run(command) {
        const ROW = () =>
            new ActionRowBuilder<
                UserSelectMenuBuilder | RoleSelectMenuBuilder | ChannelSelectMenuBuilder | StringSelectMenuBuilder
            >()
        const OPTION = (label: string, value: string, emoji: unknown) =>
            new StringSelectMenuOptionBuilder().setLabel(label).setValue(value).setEmoji(emoji)

        const components = [
            ROW().addComponents(
                new UserSelectMenuBuilder().setCustomId("user").setPlaceholder("User select menu").setMaxValues(1),
            ),
            ROW().addComponents(
                new RoleSelectMenuBuilder().setCustomId("role").setPlaceholder("Role select menu").setMaxValues(1),
            ),
            ROW().addComponents(
                new ChannelSelectMenuBuilder()
                    .setCustomId("channel")
                    .setPlaceholder("Channel select menu")
                    .setMaxValues(1),
            ),
            ROW().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("string")
                    .setPlaceholder("String select menu")
                    .setMaxValues(1)
                    .addOptions(OPTION("First option", "option 1", "😀"), OPTION("Second option", "option 2", "😀")),
            ),
        ]

        command.reply({ components, ephemeral: true })
    },
})
