import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'web/src'),
    },
  },
  test: {
    environment: 'node',
    include: ['web/src/**/*.test.ts'],
  },
})