import { srcDir } from "../dirname.js"
import Print from "../functions/log/Color.js"
import type ExtendedClient from "../structures/Client.js"
import type { ButtonType } from "../typings/Buttons.js"

export default async (client: ExtendedClient) => {
    const path = `${srcDir}/interaction/buttons`

    Print.title("[Module]", "loading Buttons")

    const files = await client.getFiles(path)

    for await (const file of files) {
        const button = (await client.importFile(file)) as ButtonType
        Print.gray("[Button]", `ID:${button.id}`)
        client.buttons.set(button.id, button)
    }
}
