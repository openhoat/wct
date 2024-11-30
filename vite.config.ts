import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@storybook/web-components-vite', 'tests/**/*.test.ts'],
    },
  },
  clearScreen: false,
  plugins: [tsconfigPaths()],
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
  },
})
