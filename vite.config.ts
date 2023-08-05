/*
 * @Description: TODO
 * @Author: zb
 * @Date: 2023-08-03 17:44:40
 * @LastEditors: zb
 * @LastEditTime: 2023-08-05 12:36:25
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import vueJsx from "@vitejs/plugin-vue2-jsx";

import { resolve } from "path";

export default defineConfig({
  root: resolve(__dirname, "./"),
  publicDir: resolve(__dirname, "./public"),
  plugins: [vue(), vueJsx()],
  resolve: {
    extensions:['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      "@/": resolve(__dirname, "./src"),
      "@component": resolve(__dirname, "./src/component"),
      "@type": resolve(__dirname, "./src/type"),
    },
  },
});
