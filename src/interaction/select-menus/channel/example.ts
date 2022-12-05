import { ChannelSelectMenu } from "../../../structures/SelectMenu"

export default new ChannelSelectMenu({
    id: "channel",
    async run(select) {
        const content = `This select-menu is handled from \`${__filename}\``
        select.response(content)
    },
})
