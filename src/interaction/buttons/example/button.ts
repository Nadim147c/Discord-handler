import Button from "../../../structures/Button"

export default new Button({
    id: "example",
    async run(button) {
        const content = `This button handled from \`${__filename}\``
        button.response(content)
    },
})
