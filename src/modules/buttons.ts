import type { ButtonType } from "../typings/Buttons"
import type ExtendedClient from "../structures/Client"

export default async (client: ExtendedClient) => {
    const path = `${__dirname}/../interaction/buttons`

    const files = await client.getFiles(path)

    const buttons: ButtonType[] = await Promise.all(files.map((file) => client.importFile(file)))

    buttons.forEach((button) => client.buttons.set(button.id, button))
}
