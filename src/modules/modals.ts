import { srcDir } from "../dirname.js"
import Print from "../functions/log/Color.js"
import type ExtendedClient from "../structures/Client.js"
import type { ModalType } from "../typings/Modals.js"

export default async (client: ExtendedClient) => {
    const path = `${srcDir}/interaction/modals`

    Print.title("[Module]", "loading Modals")

    const files = await client.getFiles(path)

    for await (const file of files) {
        const modal = (await client.importFile(file)) as ModalType
        Print.gray("[Modals]", `ID:${modal.id}`)
        client.modals.set(modal.id, modal)
    }
}
