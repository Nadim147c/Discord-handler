import { StringSelectMenu } from "../../../structures/SelectMenu"

export default new StringSelectMenu({
    id: "string",
    async run(select) {
        const content = `This select-menu is handled from \`${__filename}\``
        select.response(content)
    },
})
