import prettier from "eslint-plugin-prettier";
import expo from "eslint-plugin-expo";
import react from "eslint-plugin-react";
import js from "@eslint/js";
import tseslint from 'typescript-eslint';
import globals from 'globals'


// TODO: add react recommended
export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    react.configs.flat.recommended,
    {
        ignores: [".expo", "**/node_modules"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,

            }
        }
    },
    {
        plugins: {
            prettier,
            expo,
        },
        rules: {
            "prettier/prettier": "error",

            // expo only has these two rules
            "expo/no-env-var-destructuring": "error",
            "expo/no-dynamic-env-var": "error",
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off"
        },
    }];