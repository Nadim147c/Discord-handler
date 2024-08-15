import Button from "../../../structures/Button.js"

export default new Button({
    id: "example",
    async run(button) {
        button.reply(`This button handled from \`${__filename}\``)
    },
})
