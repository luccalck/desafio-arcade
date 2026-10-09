import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
export default [
  { ignores: ['node_modules/**', 'dist/**', 'reports/**', 'artifacts/**', 'tmp/**', 'test-results/**', 'playwright-report/**', '.publish/**'] },
  js.configs.recommended, ...ts.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } }, rules: { '@typescript-eslint/no-explicit-any': 'error' } },
];
