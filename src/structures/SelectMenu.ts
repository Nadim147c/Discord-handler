import { SelectMenuType } from "../typings/SelectMenus"

export class SelectMenu {
    constructor(selectOptions: SelectMenuType) {
        Object.assign(this, selectOptions)
    }
}
