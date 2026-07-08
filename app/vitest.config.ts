import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    environment: 'node',
    // Integration tests use unique IDs per test so parallel runs are safe
    setupFiles: ['src/__tests__/integration/setup.ts'],
  },
});
