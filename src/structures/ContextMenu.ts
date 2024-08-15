import { ApplicationCommandType } from "discord.js"
import type { MessageContextMenuType, UserContextMenuType } from "../typings/ContextMenus.js"

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
