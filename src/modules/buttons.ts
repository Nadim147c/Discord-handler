import { srcDir } from "../dirname.js"
import ExtendedClient from "../structures/Client.js"
import type { ButtonType } from "../typings/Buttons.js"

export default async (client: ExtendedClient) => {
    const path = `${srcDir}/interaction/buttons`

    const files = await client.getFiles(path)

    const buttons: ButtonType[] = await Promise.all(files.map((file) => client.importFile(file)))

    buttons.forEach((button) => client.buttons.set(button.id, button))
}
