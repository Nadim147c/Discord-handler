import { RoleSelectMenu } from "../../../structures/SelectMenu"

export default new RoleSelectMenu({
    id: "role",
    async run(select) {
        const content = `This select-menu is handled from \`${__filename}\``
        select.response(content)
    },
})
