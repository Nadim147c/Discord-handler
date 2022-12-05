import { UserSelectMenu } from "../../../structures/SelectMenu"

export default new UserSelectMenu({
    id: "user",
    async run(select) {
        const content = `This select-menu is handled from \`${__filename}\``
        select.response(content)
    },
})
