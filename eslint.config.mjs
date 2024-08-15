import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
})

export default [
    {
        ignores: ["**/dist", "eslint.config.mjs", "commitlint.config.js", "pre-commit.js"],
    },
    ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
        },

        languageOptions: {
            globals: {},
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",

            parserOptions: {
                project: "./tsconfig.json",
            },
        },

        rules: {
            "@typescript-eslint/semi": "off",
            "@typescript-eslint/quotes": "off",
            "@typescript-eslint/indent": "off",
            "object-curly-newline": "off",
            "max-classes-per-file": "off",
            "no-plusplus": "off",
            "consistent-return": "off",

            "max-len": [
                "error",
                {
                    code: 120,
                },
            ],

            "linebreak-style": ["warn", "unix"],
            quotes: ["error", "double"],
            semi: ["error", "never"],

            "no-console": [
                "warn",
                {
                    allow: ["warn"],
                },
            ],

            indent: [
                "error",
                4,
                {
                    SwitchCase: 1,
                },
            ],

            "no-unused-vars": [
                "error",
                {
                    caughtErrors: "none",
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
        },
    },
]
