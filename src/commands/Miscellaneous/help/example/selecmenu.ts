import {
    ActionRowBuilder,
    ChannelSelectMenuBuilder,
    ComponentEmojiResolvable,
    MentionableSelectMenuBuilder,
    RoleSelectMenuBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    UserSelectMenuBuilder,
} from "discord.js"
import Command from "../../../../structures/Command.js"

export default new Command({
    data: {
        name: "selectmenu",
        description: "Select menu example",
    },
    dev: true,
    async run(command) {
        type RowComponents =
            | UserSelectMenuBuilder
            | RoleSelectMenuBuilder
            | ChannelSelectMenuBuilder
            | StringSelectMenuBuilder
            | MentionableSelectMenuBuilder

        const createRow = () => new ActionRowBuilder<RowComponents>()
        const createOption = (label: string, value: string, emoji: ComponentEmojiResolvable) => {
            return new StringSelectMenuOptionBuilder()
                .setLabel(label)
                .setValue(value)
                .setEmoji(emoji)
        }

        const components = [
            createRow().addComponents(
                new UserSelectMenuBuilder()
                    .setCustomId("user")
                    .setPlaceholder("User select menu")
                    .setMaxValues(1),
            ),
            createRow().addComponents(
                new RoleSelectMenuBuilder()
                    .setCustomId("role")
                    .setPlaceholder("Role select menu")
                    .setMaxValues(1),
            ),
            createRow().addComponents(
                new ChannelSelectMenuBuilder()
                    .setCustomId("channel")
                    .setPlaceholder("Channel select menu")
                    .setMaxValues(1),
            ),
            createRow().addComponents(
                new MentionableSelectMenuBuilder()
                    .setCustomId("mentionable")
                    .setPlaceholder("Mentionable select menu")
                    .setMaxValues(1),
            ),
            createRow().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("string")
                    .setPlaceholder("String select menu")
                    .setMaxValues(1)
                    .addOptions(
                        createOption("First option", "option 1", "😀"),
                        createOption("Second option", "option 2", "😀"),
                    ),
            ),
        ]

        command.reply({ components, ephemeral: true })
    },
})
