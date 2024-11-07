import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@examples', replacement: '/src/examples' },
      { find: '@components', replacement: '/src/components' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@commons', replacement: '/src/commons' },
      { find: '@stores', replacement: '/src/stores' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@layouts', replacement: '/src/layouts' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@router', replacement: '/src/router' },
      { find: '@services', replacement: '/src/services' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@apis', replacement: '/src/apis' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@type', replacement: '/src/type' },
    ],
  },
});
