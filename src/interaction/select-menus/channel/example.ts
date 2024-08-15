import { ChannelSelectMenu } from "../../../structures/SelectMenu.js"

export default new ChannelSelectMenu({
    id: "channel",
    async run(select) {
        select.reply(`This select-menu is handled from \`${__filename}\``)
    },
})
