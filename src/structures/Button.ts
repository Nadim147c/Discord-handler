import { ButtonType } from "../typings/Buttons"

export default class Button {
    constructor(buttonOptions: ButtonType) {
        Object.assign(this, buttonOptions)
    }
}
