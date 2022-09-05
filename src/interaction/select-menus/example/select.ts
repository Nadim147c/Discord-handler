import { SelectMenu } from "../../../structures/SelectMenu"

export default new SelectMenu({
    id: "example",
    async run(select) {
        const content = `This select-menu is handled from \`${__filename}\``
        select.response(content)
    },
})
