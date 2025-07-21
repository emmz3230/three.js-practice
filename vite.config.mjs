import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

const isCodeSandbox = !!process.env.CODESANDBOX_HOST;

export default defineConfig({
  root: "src/",
  publicDir: "../static/",
  base: "./",
  server: {
    host: true,
    open: !isCodeSandbox,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },

  plugins: [glsl()],
});
