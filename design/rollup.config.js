/* eslint-disable no-undef */
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import copy from "rollup-plugin-copy";
import external from "rollup-plugin-peer-deps-external";
import progress from "rollup-plugin-progress";
import styles from "rollup-plugin-styles";
import typescript from "rollup-plugin-typescript2";
import visualizer from "rollup-plugin-visualizer";

import attachDebugger from "../debug-package";
import pkg from "./package.json";


const devMode = process.env.NODE_ENV === "development";
const visualizerEnabled = false;

const options = {
    input: "src/index.tsx",
    treeshake: !devMode,
    output: [{
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: devMode
    },
    {
        file: pkg.module,
        format: "es",
        exports: "named",
        sourcemap: devMode
    }
    ],
    external: ["rollup", "react-dom"],
    plugins: [
        commonjs(),
        copy({
            targets: [
                { src: "src/autogen/themes", dest: "dist/" }
            ]
        }),
        external(),
        progress({
        }),
        url(),
        resolve(),
        typescript({
            clean: true,
            tsconfigOverride: {
                exclude: ["src/**/*.test.(tsx|ts)", "src/**/*.stories.tsx", "src/**/__tests__", "src/**/stories", "src/**/storyAssets"]
            }
        }),
        styles()
    ]
};

attachDebugger(options.plugins);

if (visualizerEnabled) {
    options.plugins.push(visualizer());
}

export default options;
