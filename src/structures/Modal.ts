import { ModalType } from "../typings/Modals"

export class Modal {
    constructor(modalOptions: ModalType) {
        Object.assign(this, modalOptions)
    }
}
