import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
  {
    input: "src/main.js",
    output: {
      name: "VueComplierTemplate",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [terser()],
  },
  {
    input: "src/main.js",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [resolve(), commonjs(), terser()],
  },
];
