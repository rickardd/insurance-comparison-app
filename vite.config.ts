import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // @ts-expect-error look into this
  test: {
    globals: true,
    environment: "jsdom",
  },
});
