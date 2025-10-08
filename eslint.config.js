import eslint from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
// import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
// import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  eslint.configs.recommended,
  
  {
    ignores: [".next/**", ".vscode/**", "next-env.d.ts"],
  },
  // base config
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es5,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: {
        "@typescript-eslint": typescriptEslint,
      },
    },
  },
  // React config
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: react,
      "react-hooks": reactHooks,
    },
    rules: {
      // https://typescript-eslint.io/rules/no-deprecated/
      // "@typescript-eslint/no-deprecated": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // TSX specific rules
  {
    files: ["**/*.tsx"],
    rules: {
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
    },
  },
  // Test files configuration
  {
    files: ["**/*.test.{ts,tsx}"],
    plugins: {
      jest: jest,
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      // Jest recommended rules
      ...jest.configs.recommended.rules,
      // Override for test files
      "@typescript-eslint/unbound-method": "off",
      "jest/unbound-method": "error",
    },
  },
  // https://www.npmjs.com/package/eslint-plugin-react-hooks
  reactHooks.configs['recommended-latest'],
  // eslint-config-prettier を最後に適用する
  prettierConfig,
];
