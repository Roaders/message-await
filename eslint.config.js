import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    {
        ignores: ['dist/'],
    },
    {
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': ['error', { endOfLine: 'auto', tabWidth: 4, singleQuote: true, printWidth: 120 }],
        },
        files: ['**/*.ts', '**/*.js'],
    },
];
