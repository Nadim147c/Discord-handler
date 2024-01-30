import { logError } from "../../functions/log/logger"
import Event from "../../structures/Event"
import { ExtendedAutoComplete } from "../../typings/Commands"

export default new Event("interactionCreate", async (interaction) => {
    if (!interaction.isAutocomplete()) return

    const autoComplete = interaction as unknown as ExtendedAutoComplete
    
    const { client, options, commandName } = autoComplete

    const group = options.getSubcommandGroup(false)
    const sub = options.getSubcommand(false)

    const keys = [commandName, group, sub].filter((x) => !!x)
    const key = keys.join("-")

    const command = client.commands.get(key)

    if (!command || !command.autocomplete) return

    const focused = options.getFocused()

    if (!focused) return

    const choices = await command.autocomplete(autoComplete, focused).catch(logError)

    if (!choices || !choices.length) return

    await autoComplete.respond(choices.slice(0, 25)).catch(logError)
})
