# Discord Handler

A complete discord.js typescript handler.

---

-   [Installation](#installation)

    -   [Environment Variables](#environment-variables)

-   [Commands](#commands)

    -   [Auto Complete](#auto-complete)
    -   [Properties](#properties)
    -   [Methods](#methods)
    -   [Subcommands and Files Structure](#subcommands-and-files-structure)

-   [Interactions](#interactions)

    -   [Properties](#properties-1)
    -   [Methods](#methods-1)
    -   [Escape Handling](#escape-handling)
    -   [Files Structure](#files-structure)
    -   [Custom Value](#custom-value)

-   [Trigger](#triggers)

    -   [Methods](#methods-2)

---

## Installation

-   Use this command to clone the repository and install of dependency.

```bash
git clone https://github.com/3N147/Discord-handler.git

npm i
```

### Environment Variables

-   Create `.env` file and set those following values. Take a look in the [example](.env.example) file.
    -   `DISCORD`: Discord API Token
    -   `LOGIN`: Discord Webhook URL for bot logging logs
    -   `ERROR`: Discord Webhook URL for error logs
    -   `GUILDS`: Discord Webhook URL for guild join or leave logs

---

## Commands

-   Dynamic handler. You don't have to user `client.on` in your index file.
-   All commands are categorized by folder in [commands](/src/commands/) folder.
-   You have export a commands object using the [Command Class](src/structures/Command.ts).
-   Your the `run` method will be executed when someone uses the command.

```ts
import { Command } from "../../../structures/Command"

export default new Command({
    data: {
        name: "command-name", // The name of the command
        description: "A description",
    },
    async run(interaction) {
        // Your code goes here
    },
})
```

### Auto Complete

-   `Autocomplete` interaction can be handled by `autocomplete` method. **[Learn More]()**

```ts
export default new Command({
    data: { ..., options: [{..., autocomplete: true}]},
    async autocomplete(interaction, focused) {
        const choices = getChoicesSomeHow(focused)
        return choices
    },
    async run() { ... },
})

```

### Properties

-   You can set `permissions` property. It will automatically check permissions for you.
-   You can set custom `timeout`, `dev` or `beta`, `defer` and `ephemeral` property.

```ts
export default new Command({
    data: {...},
    dev: true,
    beta: true,
    permissions: ["Speak"],
    deffer: true,
    ephemeral: true,
    timeout: 1000 * 5,// 5 seconds
    async autocomplete(_, _) { ... },
    async run(_) { ... },
})
```

### Methods

-   You get `response`, `warn` and `error` method for quickly replying to users.

```ts
export default new Command({
    data: { ... },
    async run(command) {
        command.response("Thanks for using me.")
        command.warn("You can't do that.", false, 5)
        command.error("User don't exists.", true)
    },
})
```

### Subcommands and Files Structure

-   You can create a folder and put your commands folder in it to create `subcommand` and `subcommand-group`. **[Learn More](https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups)**

```ts
commands
|
|__ category-folder
    |__ command-file    "/ping"
|
|__ category-folder
    |__ command-folder
       |__ command-file   "/help commands"
|
|__ category-folder
    |__ command-folder
        |__ subcommand-group-folder
            |__ command-file    "/timeout user remove"
```

---

## Interactions

All `Button`, `Select Menu`, `Modal` and `Context Menu` handlers are available in the [interactions](/src/interaction/) folder.

> Note: `Context Menu` have two types in the [context-menus](src/interaction/context-menus/) ([`Users`](src/interaction/context-menus/users/) and [`Messages`](src/interaction/context-menus/messages/)) folder.

### Properties

-   Every interaction handler has `permission` property for auto permission checking.

### Methods

-   You get `response`, `warn` and `error` method for quickly replying to users. (same as [`commands`](#additional-methods))

### Escape Handling

-   You can use `t:` in front of custom id of the components to avoid handling. This is important for handling `Modals`, `Buttons` and `Select Menus` by using `awaitModalSubmit`, `awaitMessageComponent` or `MessageComponentCollector`

```ts
export default new Command({
    data: { ... },
    async run(interaction) {
        const button = new ButtonBuilder()....setCustomId("t:confirm")
        const components = [...(button)]
        const message = await interaction.reply({ components }) as Message
        // Button handler won't give a missing module error
        const confirmation = await message.awaitMessageComponent({ ... })
    },
})
```

> Note: [`autocomplete`](#auto-complete) interactions are handled from command handlers.

### Files Structure

```ts
EXAMPLE OF VALID SELECT MENU HANDLERS
select-menus
|
|__ folder
    |__ file
|
|__ file
|
|__ folder
    |__ folder
        |__ file
```

### Custom Value

In `Button`, `Select Menu` and `Modal Submit` interaction there is `customValue` property.

> Here is an example use case of this feature. This is a user filter.

```ts
// Command handler
export default new Command({
    data: { ... },
    async run(interaction) {
        // customId = `${key}:${customValue}`
        const button = new ButtonBuilder()....setCustomId(`click-me:${user.id}`)
        const components = [...(button)]
        interaction.reply({ components })
    },
})
```

```ts
// Button handler
export default new Button({
    id: "click-me", // key
    async run(interaction) {
        // customValue
        if (interaction.customValue !== interaction.user.id) return interaction.warn("You can't use this button")
    },
})
```

---

## Triggers

-   There are two type of triggers. ([`Reaction`](src/triggers/reactions/) and [`Message`](src/triggers/messages/))
-   Reaction trigger runs when someone reacts with the specified emoji.
-   Message triggers runs when someone includes specified word/prase in the `Message Content`.

### Methods

-   You get `response`, `warn` and `error` method for quickly replying to users. (same as [`commands`](#additional-methods))

---

## Logging

You can save logs using `Discord Webhook`.

-   Set your `Discord Webhook` URL as `environment` variable.
-   Check `environment` variable part in [**installation**](#installation).

---

## License

Distributed under **[MIT](./LICENSE)** license by [3N147](https://github.com/3N147).
