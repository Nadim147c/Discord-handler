import { ApplicationCommandType } from "discord.js"
import { MessageContextMenuType, UserContextMenuType } from "../typings/ContextMenus"

export class MessageContentMenu {
    constructor(options: MessageContextMenuType) {
        Object.assign(this, options, { type: ApplicationCommandType.Message })
    }
}

export class UserContextMenu {
    constructor(options: UserContextMenuType) {
        Object.assign(this, options, { type: ApplicationCommandType.User })
    }
}
