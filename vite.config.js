import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./util/localhost-key.pem'),
      cert: fs.readFileSync('./util/localhost.pem'),
    },
  },
});
