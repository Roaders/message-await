module.exports = [
    {
        ignores: ['dist/'],
    },
    {
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
            prettier: require('eslint-plugin-prettier'),
        },
        rules: {
            'prettier/prettier': ['error', { endOfLine: 'auto', tabWidth: 4, singleQuote: true, printWidth: 120 }],
        },
        files: ['**/*.ts', '**/*.js'],
    },
];
