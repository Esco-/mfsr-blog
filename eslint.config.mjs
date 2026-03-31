import js from "@eslint/js"
import globals from "globals"
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from "eslint/config";
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

export default defineConfig([
    globalIgnores(['**/dist/', '**/vite.config.ts']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.config.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            compat.extends(
                /*'eslint:recommended',*/
                /*'plugin:react/recommended',*/
                'plugin:jsx-a11y/recommended',
                'prettier',
            ),
        ],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: globals.browser,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
])
