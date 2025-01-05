import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    open: true, // Automatically open in browser
    port: 3000, // Port for local development
  },
  build: {},
  resolve: {},
});
