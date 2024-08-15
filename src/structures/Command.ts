import { CommandType } from "../typings/Commands.js"

export default class Command {
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions)
    }
}
