import Button from "../../../structures/Button.js"

export default new Button({
    id: "example",
    async run(button) {
        await button.reply(`This button handled from \`${__filename}\``)
    },
})
