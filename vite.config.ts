import { defineConfig } from "vitest/config";

export default defineConfig({
//   build: {
//     outDir: "build",
//     lib: {
//       entry: "src/index.ts",
//       name: "query-utilities",
//     },
//   },
  test: {
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
    },
  },
});
