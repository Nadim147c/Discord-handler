import { ButtonType } from "../typings/Buttons"

export class Button {
    constructor(buttonOptions: ButtonType) {
        Object.assign(this, buttonOptions)
    }
}
