import { defineConfig } from 'vite'
const packageJSON = require("./package.json");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: 'src/my-element.ts',
      name: packageJSON.name,
      formats: ['umd'],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: /^lit/
    }
  }
})
