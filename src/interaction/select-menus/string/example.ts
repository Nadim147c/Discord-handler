import { StringSelectMenu } from "../../../structures/SelectMenu.js"

export default new StringSelectMenu({
    id: "string",
    async run(select) {
        await select.reply(`This select-menu is handled from \`${__filename}\``)
    },
})
