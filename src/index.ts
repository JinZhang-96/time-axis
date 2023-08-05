/*
 * @Description: TODO 
 * @Author: zb
 * @Date: 2023-08-03 20:26:04
 * @LastEditors: zb
 * @LastEditTime: 2023-08-05 12:33:30
 */
import { VueConstructor } from "vue";

import { TimeAxis } from "@component";

import './style/index.less'

export default (vue: VueConstructor) => {
  vue.component(TimeAxis.name, TimeAxis);
};
