/*
 * @Description: TODO
 * @Author: zb
 * @Date: 2023-08-04 16:38:38
 * @LastEditors: zb
 * @LastEditTime: 2023-08-06 14:41:52
 */

import vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import UILibPlugin from "@/";


vue.use(ElementUI, {
  size: "medium", // set element-ui default size
});
vue.use(UILibPlugin);

new vue({
  el: "#app",
  data() {
    return {
      model: new Date("2023-08-02 00:00:00"),
    };
  },
  watch: {
    model(val) {
      console.log(val);
    },
  },
  methods: {},
  render() {
    return (
      <time-axis
        vModel={this.model}
      >
      </time-axis>
    );
  },
});
