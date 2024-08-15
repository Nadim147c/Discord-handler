import { ButtonType } from "../typings/Buttons.js"

export default class Button {
    constructor(buttonOptions: ButtonType) {
        Object.assign(this, buttonOptions)
    }
}
