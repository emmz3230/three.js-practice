import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  build: { sourcemap: true, target: "esnext" },
  plugins: [glsl()],
});
