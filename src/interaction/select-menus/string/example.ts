import { StringSelectMenu } from "../../../structures/SelectMenu.js"

export default new StringSelectMenu({
    id: "string",
    async run(select) {
        select.reply(`This select-menu is handled from \`${__filename}\``)
    },
})
