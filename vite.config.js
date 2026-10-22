import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The site is published on GitHub Pages under /Tp-countries.dev/
export default defineConfig({
  plugins: [react()],
  base: "/Tp-countries.dev/",
});
