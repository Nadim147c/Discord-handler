import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    type ChannelSelectMenuBuilder,
    ModalBuilder,
    type RoleSelectMenuBuilder,
    type StringSelectMenuBuilder,
    TextInputBuilder,
    type TextInputStyle,
    type UserSelectMenuBuilder,
} from "discord.js"

type ComponentType =
    | ButtonBuilder
    | UserSelectMenuBuilder
    | RoleSelectMenuBuilder
    | ChannelSelectMenuBuilder
    | StringSelectMenuBuilder

export const createRow = (...components: ComponentType[]) =>
    new ActionRowBuilder().setComponents(components) as ActionRowBuilder<ComponentType>

const { Link, Secondary } = ButtonStyle

export const createButton = (
    label: string,
    customId: string,
    style: ButtonStyle = Secondary,
    disabled?: boolean,
    emoji?: string
) => {
    const button = new ButtonBuilder().setStyle(style)
    if (label) button.setLabel(label)
    style === Link ? button.setURL(customId) : button.setCustomId(customId)
    if (emoji) button.setEmoji(emoji)
    if (disabled) button.setDisabled(disabled)
    return button
}

export const createModalField = (
    label: string,
    customId: string,
    placeholder: string,
    style: TextInputStyle,
    required = true,
    min?: number,
    max?: number
) => {
    const textInput = new TextInputBuilder()
        .setLabel(label)
        .setCustomId(customId)
        .setStyle(style)
        .setRequired(required)

    if (placeholder) textInput.setPlaceholder(placeholder)
    if (min) textInput.setMinLength(min)
    if (max) textInput.setMaxLength(max)

    return new ActionRowBuilder<TextInputBuilder>().setComponents(textInput)
}

export const createModel = (title: string, customId: string) =>
    new ModalBuilder().setTitle(title).setCustomId(customId)
