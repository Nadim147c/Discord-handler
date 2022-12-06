import { CommandType } from "../typings/Commands"

export default class Command {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions)
    }
}
