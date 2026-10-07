import { defineConfig } from 'vitest/config';
export default defineConfig({ test: {
  include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.ts'],
  reporters: ['default', ['junit', { outputFile: 'reports/junit.xml' }]],
  coverage: { provider: 'v8', include: ['src/core/**/*.ts'], exclude: ['src/core/types.ts'],
    reporter: ['text', 'html', 'json-summary', 'lcov'], reportsDirectory: 'reports/coverage',
    thresholds: { statements: 70, branches: 70, functions: 70, lines: 70 } },
} });
