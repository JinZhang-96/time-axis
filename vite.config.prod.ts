/*
 * @Description: TODO
 * @Author: zb
 * @Date: 2023-08-03 17:44:40
 * @LastEditors: zb
 * @LastEditTime: 2023-08-06 00:11:04
 */
import { mergeConfig } from "vite";
import { resolve } from "path";

import defaultConfig from "./vite.config";

export default mergeConfig(defaultConfig, {
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "uiLib",
      // the proper extensions will be added
      fileName: "ui-lib",
    },
    rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue', 'element-ui'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
            'element-ui': 'ELEMENT',
          },
        },
      },
  },
});
