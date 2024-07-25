import prettier from "eslint-plugin-prettier";
import expo from "eslint-plugin-expo";
import js from "@eslint/js";
import tseslint from 'typescript-eslint';


export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: [".expo", "**/node_modules"],
    }, {
        plugins: {
            prettier,
            expo,
        },

        rules: {
            "prettier/prettier": "error",

            // expo only has these two rules
            "expo/no-env-var-destructuring": "error",
            "expo/no-dynamic-env-var": "error"
        },
    }];