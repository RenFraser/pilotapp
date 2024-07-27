import prettier from "eslint-plugin-prettier";
import expo from "eslint-plugin-expo";
import react from "eslint-plugin-react";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import depend from "eslint-plugin-depend";
import pluginPromise from "eslint-plugin-promise";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import sonarjs from "eslint-plugin-sonarjs";

// TODO: add react recommended
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  depend.configs["flat/recommended"], // prevents using redundant 3rd party libs for built-ins or popular libs
  pluginPromise.configs["flat/recommended"], // enforce best practices when using promises
  perfectionist.configs["recommended-natural"], // sorts all collections. Arrays, props, imports etc.
  eslintPluginUnicorn.configs["flat/recommended"],
  sonarjs.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.builtin,
      },
    },
  },
  {
    ignores: [".expo", "**/node_modules"],
    plugins: {
      prettier,
      expo,
    },
    rules: {
      "prettier/prettier": "error",
      "expo/no-env-var-destructuring": "error",
      "expo/no-dynamic-env-var": "error",
      "react/jsx-uses-react": "off", // react 17 automatically imports React for you. You don't need it in 17+
      "react/react-in-jsx-scope": "off", // react 17 automatically imports React for you. You don't need it in 17+
      // no unescaped entities is great if you do something like <div>> <div> in your code
      // but it also enforces better practices around typography so that the correct symbols render.
      // I, and many other devs find it painful to not use ' and instead use something like &apos;
      // so using this override strips out that need to escape quotes and such and still gives you
      // the nice benefit of catching real closing problems.
      // See: // see: https://github.com/jsx-eslint/eslint-plugin-react/issues/894
      "react/no-unescaped-entities": [
        "error",
        {
          forbid: [">", "}"],
        },
      ],
      "unicorn/prefer-module": "off", // covered by typescript eslint
      "unicorn/prevent-abbreviations": "off", // annoying
      "unicorn/no-useless-undefined": "off", // incompatible with typescript TS7030, returns are enforced, even if it's a return undefined
      "unicorn/no-abusive-eslint-disable": "off", // doesn't seem to respect ignore patterns? It's firing on an ignored file.
    },
  },
];
