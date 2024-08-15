import { exec } from "child_process"
import { promisify } from "util"

const promiseExec = promisify(exec)

export async function preCommit() {
    await $`pnpm format "./package.json" "./CHANGELOG.md"`
    await promiseExec("pnpm format './package.json' './CHANGELOG.md'")
}
