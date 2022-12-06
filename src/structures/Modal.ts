import { ModalType } from "../typings/Modals"

export default class Modal {
    constructor(modalOptions: ModalType) {
        Object.assign(this, modalOptions)
    }
}
