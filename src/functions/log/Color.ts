import chalk from "chalk"

export default class Print {
    static title(...text: unknown[]) {
        console.log(chalk.bold(chalk.green(...text)))
    }

    static gray(...text: unknown[]) {
        console.log(chalk.bold(chalk.gray(...text)))
    }
}
