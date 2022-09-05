import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    SelectMenuBuilder,
    SelectMenuComponentOptionData,
    TextInputBuilder,
    TextInputStyle,
} from "discord.js"

export const createRow = (...components: (ButtonBuilder | SelectMenuBuilder)[]) =>
    new ActionRowBuilder().setComponents(components) as
        | ActionRowBuilder<ButtonBuilder>
        | ActionRowBuilder<SelectMenuBuilder>

const { Link, Secondary } = ButtonStyle

export const createButton = (
    label: string,
    customId: string,
    style: ButtonStyle = Secondary,
    disabled?: boolean,
    emoji?: string,
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
    max?: number,
) => {
    const textInput = new TextInputBuilder().setLabel(label).setCustomId(customId).setStyle(style).setRequired(required)

    if (placeholder) textInput.setPlaceholder(placeholder)
    if (min) textInput.setMinLength(min)
    if (max) textInput.setMaxLength(max)

    return new ActionRowBuilder<TextInputBuilder>().setComponents(textInput)
}

export const createModel = (title: string, customId: string) => new ModalBuilder().setTitle(title).setCustomId(customId)

export const createSelectMenu = (
    placeholder: string,
    customId: string,
    disabled: boolean,
    ...options: SelectMenuComponentOptionData[]
) => {
    const components: ActionRowBuilder<SelectMenuBuilder>[] = []

    for (let i = 0; i < 5; i++) {
        const range = [i * 25, (i + 1) * 25]

        components[i] = new ActionRowBuilder<SelectMenuBuilder>().setComponents(
            new SelectMenuBuilder()
                .setPlaceholder(placeholder)
                .setCustomId(customId + i)
                .setMaxValues(1)
                .setDisabled(disabled)
                .setOptions(...options.slice(...range)),
        )

        if (options.length <= (i + 1) * 25) break
    }

    return components
}
