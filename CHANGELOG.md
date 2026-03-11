# Changelog

## 2.0.0

### Breaking Changes

- **Converted to ESM**: The package now uses ES modules (`"type": "module"` in package.json). All internal imports use explicit `.js` extensions. The `log-symbols` dependency is now imported via ESM `import` instead of `require()`.
- **TypeScript module target changed**: `tsconfig.json` now targets `"module": "nodenext"` with `"moduleResolution": "nodenext"` (previously `"commonjs"`).
- **Minimum Node.js version**: CI now targets Node.js 20.x (previously 14.x).

### Updated Dependencies

- `@typescript-eslint/eslint-plugin`: `^4.29.0` → `^8.57.0`
- `@typescript-eslint/parser`: `^4.29.0` → `^8.57.0`
- `concurrently`: `^6.2.0` → `^9.2.1`
- `eslint`: `^7.32.0` → `^10.0.3`
- `eslint-plugin-prettier`: `^3.4.0` → `^5.5.5`
- `prettier`: `^2.3.2` → `^3.0.0`
- `rimraf`: `^3.0.2` → `^6.1.3`

### Removed Dependencies

- `eslint-config-prettier`
- `eslint-config-standard`
- `eslint-plugin-import`
- `eslint-plugin-node`
- `eslint-plugin-promise`

### Other Changes

- **ESLint config migrated to flat config**: Replaced `.eslintrc.js` with `eslint.config.js` using the new ESLint flat config format.
- **CI updated**: GitHub Actions updated to use `actions/checkout@v4`, `actions/setup-node@v4`, and `JS-DevTools/npm-publish@v3`.
- **Formatting**: Trailing commas added to function parameters (Prettier 3 defaults).
