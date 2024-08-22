import Modal from "../../../structures/Modal.js"

export default new Modal({
    id: "example",
    async run(modal) {
        await modal.reply(`This modal submission is handled by \`${__filename}\``)
    },
})
