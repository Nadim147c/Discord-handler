import { readdirSync } from "fs"
import { ExtendedClient } from "../structures/Client"
import { ModalType } from "../typings/Modals"

export default async (client: ExtendedClient) => {
    const pathFiles = `${__dirname}/../interaction/modals`
    const filter = (file: string) => file.endsWith(".ts") || file.endsWith(".js")

    async function loader(path: string) {
        readdirSync(path).forEach(async (file: string) => {
            if (!filter(`${path}/${file}`) && (await client.isDir(`${path}/${file}`))) return loader(`${path}/${file}`)
            const buttons: ModalType = await client.importFile(`${path}/${file}`)
            client.modals.set(buttons.id, buttons)
        })
    }

    loader(pathFiles)
}
