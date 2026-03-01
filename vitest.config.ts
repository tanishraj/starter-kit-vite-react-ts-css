/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    name: 'unit',
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['src/**/*.stories.{ts,tsx}'],
    setupFiles: ['src/test/setup.ts'],
  },
});
