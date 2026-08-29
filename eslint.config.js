import js from "@eslint/js"
import prettierConfig from "eslint-config-prettier"
import { defineConfig } from "eslint/config"
import ts from "typescript-eslint"

export default defineConfig(
	{ ignores: ["dist/", "node_modules/"] },
	js.configs.recommended,
	ts.configs.strict,
	ts.configs.stylistic,
	{
		rules: {
			"no-undef": "off",
			"@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
	prettierConfig,
)
