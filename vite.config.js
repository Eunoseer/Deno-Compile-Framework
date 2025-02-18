import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    target: "esnext", // Ensures modern JS
    modulePreload: true, // Preloads modules
    outDir: "dist",
    manifest: true,
    rollupOptions: {
      input: {
        main: "/index.html",
        styles: "/src/index.css",
      },
      output: {
        format: "esm", // ✅ Force ES Modules
        entryFileNames: "main.jsx", // Consistent output filename
      },
    },
  },
});
