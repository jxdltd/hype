await Bun.build({
  entrypoints: ["./src/index.tsx"],
  outdir: "./dist",
  target: "browser",
  format: "esm",
  external: ["react"],
  banner: '"use client";',
  minify: true,
  // watch: true, 🥺
});
