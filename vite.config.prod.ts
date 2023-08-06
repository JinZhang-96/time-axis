/*
 * @Description: TODO
 * @Author: zb
 * @Date: 2023-08-03 17:44:40
 * @LastEditors: zb
 * @LastEditTime: 2023-08-06 14:07:32
 */
import { mergeConfig } from "vite";
import { resolve } from "path";

import defaultConfig from "./vite.config";

export default mergeConfig(defaultConfig, {
  mode: "production",
  build: {
    target: "es2015",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "UILib",
      fileName: "ui-lib",
    },
    rollupOptions: {
      plugins: [],
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "element-ui", "moment"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
          "element-ui": "ELEMENT",
          moment: "moment",
        },
      },
    },
  },
});
