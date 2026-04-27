/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Симулює браузерне середовище для React
    globals: true,        // Дозволяє не імпортувати describe/it/expect у кожному файлі
    setupFiles: './src/setupTests.ts', // Файл, який запускається перед тестами
  },
});