# ⚠ This handler no longer supports windows

I recently archived this repository because it was really hard to make it work on windows. So, I dropped it's support for windows. In future, I might add support for windows. But current you have to use WSL 2 to work to work on it on windows.

# Discord Handler

A complete `discord.js` typescript handler. Automatically register commands and sub-commands.

## Features

-   Dynamic handler. You don't have to use `client.on` in your index file.
-   Creates sub commands from directory name for handling them from different module.
-   Automatically register commands.
-   Handle other [`Buttons`, `SelectMenu`, `Modal`, `ContextMenu`] interactions.
-   Handle `Message` and `Interaction` triggers.

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

---

## Installation

-   Use this command to clone the repository.

```bash
git clone https://github.com/3N147/Discord-handler.git
cd Discord-handler
```

Install all dependencies and start as `dev`. Using `npm`:

```bash
npm i
npm run dev
```

or using `yarn`:

```bash
yarn
yarn dev
```

### Environment Variables

-   Create `.env` file and set those following values. Take a look in the [example](.env.example) file.
    -   `DISCORD`: Discord API Token
    -   `LOGIN`: Discord Webhook URL for bot logging logs
    -   `ERROR`: Discord Webhook URL for error logs
    -   `GUILDS`: Discord Webhook URL for guild join or leave logs

---

## Commands

-   All commands are categorized by directory in [commands](/src/commands/) directory.
-   You just have to export a commands object using the [Command Class](src/structures/Command.ts).
-   `run` method will be executed when someone uses the command.

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

-   `Autocomplete` interaction are handled by `autocomplete` method. **[Learn More]()**

<details>
<summary>Example</summary>

```ts
import { Command } from "../../../structures/Command"
import { ApplicationCommandOptionType } from "discord.js"

export default new Command({
    data: {
        name: "autocomplete",
        description: "autocomplete example",
        options: [
            {
                type: ApplicationCommandOptionType.String,
                name: "input",
                description: "Type anything for autocomplete.",
                autocomplete: true,
                required: true,
            },
        ],
    },
    async autocomplete(interaction, focused) {
        const choices = getChoicesSomeHow(focused)
        return choices
    },
    async run(command) {
        return
    },
})
```

</details>

### Properties

-   You can set `permissions` property. It will automatically check permissions for you.
-   You can set custom `timeout`, `dev` or `beta`, `defer` and `ephemeral` property.

<details>
<summary>Example</summary>

```ts
import { Command } from "../../../structures/Command"

export default new Command({
    data: { name: "ping", description: "ping pong" },
    dev: true,
    beta: true,
    permissions: ["Speak"],
    deffer: true,
    ephemeral: true,
    timeout: 1000 * 5, // 5 seconds
    async autocomplete(interaction, focused) {},
    async run(command) {},
})
```

</details>

### Methods

-   You get `response`, `warn` and `error` method for quickly replying to users.

<details>
<summary>Example</summary>

```ts
import { Command } from "../../../structures/Command"

export default new Command({
    data: { name: "ping", description: "ping pong" },
    async run(command) {
        command.response("Thanks for using me.")
        command.warn("You can't do that.", false, 5)
        command.error("User don't exists.", true)
    },
})
```

</details>

### Subcommands and Files Structure

-   You can create a directory and put your commands directory in it to create `subcommand` and `subcommand-group`. **[Learn More](https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups)**

```ts
commands
|
|__ category-directory
|   |__ command-file    "/ping"
|
|__ category-directory
|   |__ command-directory
|      |__ command-file   "/help commands"
|
|__ category-directory
|   |__ command-directory
|       |__ subcommand-group-directory
|           |__ command-file    "/timeout user remove"
```

---

## Interactions

All `Button`, `Select Menu`, `Modal` and `Context Menu` handlers are available in the [interactions](/src/interaction/) directory.

> Note: `Context Menu` have two types in the [context-menus](src/interaction/context-menus/) ([`Users`](src/interaction/context-menus/users/) and [`Messages`](src/interaction/context-menus/messages/)) directory.

### Properties

-   Every interaction handler has `permission` property for auto permission checking.

### Methods

-   You get `response`, `warn` and `error` method for quickly replying to users. (same as [`commands`](#methods))

> Note: [`autocomplete`](#auto-complete) interactions are handled from command handlers.

#### Select Menus

`selectmenuInteraction` has different types. [`String`, `User`, `Role`, `Channel`, `Mentionable`] There are different **class**es for different types of select menu.

### Files Structure

It uses `glob` to find all module on a particular directory.

```ts
EXAMPLE OF VALID SELECT MENU HANDLERS
select-menus
|
|__ directory
|   |__ file
|
|__ file
|
|__ directory
|   |__ directory
|       |__ file
```

### Custom Value

In `Button`, `Select Menu` and `Modal Submit` interaction there is `customValue` property.

<details>
<summary>Here is an example use case of this feature. This is a user filter.</summary>

```ts
import { Command } from "../../../structures/Command"

// Command handler
export default new Command({
    data: {name: "create-button", description: "create a cool button"},
    async run(interaction) {
        // customId = `${key}:${customValue}`
        const button = new ButtonBuilder()....setCustomId(`cool-button:${user.id}`)
        const components = [...(button)]
        interaction.reply({ components })
    },
})
```

```ts
import Button from "../../../structures/Button"

// Button handler
export default new Button({
    id: "cool-button", // key
    async run(interaction) {
        // customValue
        if (interaction.customValue !== interaction.user.id)
            interaction.warn("You can't use this button")
    },
})
```

</details>

---

## Logging

You can save logs using `Discord Webhook`.

-   Set your `Discord Webhook` URL as `environment` variable.
-   Check `environment` variable part in [**installation**](#installation).

---

## License

Distributed under **[MIT](./LICENSE)** license by [Nadim147c](https://github.com/Nadim147c).
