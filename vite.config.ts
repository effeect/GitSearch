/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    proxy: {
      // Any request starting with '/api' will be forwarded to the Express server
      "/api": {
        target: "http://localhost:5000", // Your Express server port
        changeOrigin: true,
        // The rewrite rule is optional, but often useful if your Express routes
        // don't include the '/api' prefix, e.g., Express route is just '/data'
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  test: {
    // Enable global API like `describe`, `it`, `expect` without explicit imports
    globals: true,
    // Use jsdom for simulating a browser environment
    environment: "jsdom",
    // Path to your setup file (we'll create this next)
    setupFiles: "./src/setupTests.js", // or './src/setupTests.ts'
    // Optional: add a reference for vitest types if using TypeScript
    // If you encounter an error with 'defineConfig', you might need to import it from 'vitest/config' instead of 'vite'
  },
});
