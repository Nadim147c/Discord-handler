import type ExtendedClient from "../structures/Client"
import type { ModalType } from "../typings/Modals"

export default async (client: ExtendedClient) => {
    const path = `${__dirname}/../interaction/modals`

    const files = await client.getFiles(path)

    const modals: ModalType[] = await Promise.all(files.map((file) => client.importFile(file)))

    modals.forEach((modal) => client.modals.set(modal.id, modal))
}
