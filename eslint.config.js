import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import {defineConfig, globalIgnores} from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  eslint.configs.recommended,
  // Ignore files and directories
  globalIgnores([
    'node_modules/**',
    '.next/**',
    '.vscode/**',
    'next-env.d.ts',
    '.prettierrc.cjs',
    'eslint.config.js',
  ]),
  // TypeScript specific rules
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslintrc/recommended-type-checked.ts
  tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      ts: tseslint.plugin,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json', // 型解析のためのTypeScript設定ファイルを指定
      },
    },
    rules: {
      // https://typescript-eslint.io/rules/no-deprecated/
      'ts/no-deprecated': 'error',
    },
  },
  // React specific rules
  // https://www.npmjs.com/package/eslint-plugin-react
  // https://www.npmjs.com/package/eslint-plugin-react-hooks
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // eslint-config-prettier を最後に適用する
  // prettierと競合する可能性のあるルールをすべて無効化する
  eslintConfigPrettier,
]);
