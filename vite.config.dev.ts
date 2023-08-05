/*
 * @Description: TODO
 * @Author: zb
 * @Date: 2023-08-03 17:44:40
 * @LastEditors: zb
 * @LastEditTime: 2023-08-04 15:22:42
 */
import { mergeConfig } from "vite";
import { resolve } from "path";

import defaultConfig from "./vite.config";

export default mergeConfig(defaultConfig, {
  server: {
    hmr: true,
    port: 4000,
    open: "./index.html"    
  },
  build: {
    // rollupOptions: {
    //     input:{
    //       index: 'src/index.ts'
    //     }
    //   },
  },
});
