import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // デフォルトの dist を build に変更
  },
  base: "/20250203_dinnerRecord/",
});
