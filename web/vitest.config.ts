import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    environment: 'node',
    // Integration tests need a live DB — run sequentially
    pool: 'forks',
    singleFork: true,
    setupFiles: ['src/__tests__/integration/setup.ts'],
  },
});
