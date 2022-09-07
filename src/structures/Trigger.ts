import { MessageTriggerType, ReactionTriggerType } from "../typings/Triggers"

export class MessageTrigger {
    constructor(options: MessageTriggerType) {
        Object.assign(this, options)
    }
}

export class ReactionTrigger {
    constructor(options: ReactionTriggerType) {
        Object.assign(this, options)
    }
}
