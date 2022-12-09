import { MentionableSelectMenu } from "../../../structures/SelectMenu"

export default new MentionableSelectMenu({
    id: "mentionable",
    async run(select) {
        const content = `This select-menu is handled from \`${__filename}\``
        select.response(content)
    },
})
