import { Modal } from "../../../structures/Modal"

export default new Modal({
    id: "example",
    async run(modal) {
        const content = `This modal submission is handled by \`${__filename}\``
        modal.response(content)
    },
})
