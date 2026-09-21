/**
 * ESLint config for my-today (React 18 + TypeScript + Vite).
 *
 * Uses the legacy .eslintrc format (not flat config) because ESLint 8.x still
 * defaults to it. The .cjs extension is required: package.json sets
 * "type": "module", so a plain .eslintrc.js would be parsed as ESM and rejected.
 *
 * Deliberately NOT type-aware (no parserOptions.project) — type-aware rules
 * would re-run the whole TS program on every lint, and `npm run build` already
 * runs `tsc --noEmit` for real type checking.
 */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint', 'react-hooks', 'react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    'node_modules',
    '.docs',
    '.claude',
    'coverage',
    '.eslintrc.cjs',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Unused args are fine when prefixed with _ (common for event handlers).
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
  },
  overrides: [
    {
      // Serverless function + build tooling run in Node, not the browser.
      files: ['api/**/*.ts', 'vite.config.ts', 'tailwind.config.js', 'postcss.config.js'],
      env: { browser: false, node: true },
    },
    {
      // Plain-JS emulator test script.
      files: ['scripts/**/*.mjs'],
      env: { browser: false, node: true },
      extends: ['eslint:recommended'],
    },
  ],
};
