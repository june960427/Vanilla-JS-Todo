import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/Vanilla JS Todo",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@service": path.resolve(__dirname, "./src/service"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
    extensions: [".js"],
  },
});
