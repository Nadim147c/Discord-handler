import { srcDir } from "../dirname.js"
import type ExtendedClient from "../structures/Client.js"
import type { ModalType } from "../typings/Modals.js"

export default async (client: ExtendedClient) => {
    const path = `${srcDir}/interaction/modals`

    const files = await client.getFiles(path)

    const modals: ModalType[] = await Promise.all(files.map((file) => client.importFile(file)))

    for (const modal of modals) client.modals.set(modal.id, modal)
}
