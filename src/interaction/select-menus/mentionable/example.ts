import { MentionableSelectMenu } from "../../../structures/SelectMenu.js"

export default new MentionableSelectMenu({
    id: "mentionable",
    async run(select) {
        select.reply(`This select-menu is handled from \`${__filename}\``)
    },
})
