import { MessageContextMenuType, UserContextMenuType } from "../typings/ContextMenus"

export class MessageContentMenu {
    constructor(options: MessageContextMenuType) {
        Object.assign(this, options)
    }
}

export class UserContextMenu {
    constructor(options: UserContextMenuType) {
        Object.assign(this, options)
    }
}
