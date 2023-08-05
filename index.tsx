/*
 * @Description: TODO
 * @Author: zb
 * @Date: 2023-08-04 16:38:38
 * @LastEditors: zb
 * @LastEditTime: 2023-08-06 00:06:05
 */

import vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import TimeAxisPlugin from "@/";

vue.use(ElementUI, {
  size: "medium", // set element-ui default size
});
vue.use(TimeAxisPlugin);

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
        start-time={new Date("2023-08-01 00:00:00")}
        end-time={new Date("2023-08-05 00:00:00")}
        vModel={this.model}
      >
      </time-axis>
    );
  },
});
