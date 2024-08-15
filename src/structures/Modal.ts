import { ModalType } from "../typings/Modals.js"

export default class Modal {
    constructor(modalOptions: ModalType) {
        Object.assign(this, modalOptions)
    }
}
