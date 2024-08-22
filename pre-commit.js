import { exec } from "child_process"
import { promisify } from "util"

const promiseExec = promisify(exec)

export async function preCommit() {
    await promiseExec("bun run format './package.json' './CHANGELOG.md'")
}
