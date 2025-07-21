import glsl from "vite-plugin-glsl";

const isCodeSanbox = !!process.env.SandBox_URL;

export default {
  root: "src/",
  publicDir: "../static/",
  base: "./",
  server: {
    host: true,
    open: !isCodeSanbox,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
  Plugins: [
    glsl({
      include: /\.glsl$/i,
      compress: true,
      exclude: ["**/node_modules/**"],
    }),
  ],
};
