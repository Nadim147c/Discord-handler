import { UserSelectMenu } from "../../../structures/SelectMenu.js"

export default new UserSelectMenu({
    id: "user",
    async run(select) {
        await select.reply(`This select-menu is handled from \`${__filename}\``)
    },
})
