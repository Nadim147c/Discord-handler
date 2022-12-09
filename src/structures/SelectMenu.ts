import {
    ChannelSelectMenuType,
    MentionableSelectMenuType,
    RoleSelectMenuType,
    StringSelectMenuType,
    UserSelectMenuType,
} from "../typings/SelectMenus"

export class StringSelectMenu {
    constructor(selectOptions: StringSelectMenuType) {
        Object.assign(this, selectOptions, { type: "String" } as StringSelectMenuType)
    }
}

export class UserSelectMenu {
    constructor(selectOptions: UserSelectMenuType) {
        Object.assign(this, selectOptions, { type: "User" } as UserSelectMenuType)
    }
}

export class RoleSelectMenu {
    constructor(selectOptions: RoleSelectMenuType) {
        Object.assign(this, selectOptions, { type: "Role" } as RoleSelectMenuType)
    }
}

export class ChannelSelectMenu {
    constructor(selectOptions: ChannelSelectMenuType) {
        Object.assign(this, selectOptions, { type: "Channel" } as ChannelSelectMenuType)
    }
}

export class MentionableSelectMenu {
    constructor(selectOptions: MentionableSelectMenuType) {
        Object.assign(this, selectOptions, { type: "Mentionable" } as MentionableSelectMenuType)
    }
}
