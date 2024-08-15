import { RoleSelectMenu } from "../../../structures/SelectMenu.js"

export default new RoleSelectMenu({
    id: "role",
    async run(select) {
        select.reply(`This select-menu is handled from \`${__filename}\``)
    },
})
