/*
 * @Description: TODO 
 * @Author: zb
 * @Date: 2023-08-03 20:26:04
 * @LastEditors: zb
 * @LastEditTime: 2023-08-06 14:08:19
 */
import { VueConstructor } from "vue";

import { TimeAxis } from "@component";
import './style/index.less'

export { TimeAxis };
export type { Mode, TimeAxisOption } from "@type";

export default (vue: VueConstructor) => {
  vue.component(TimeAxis.name, TimeAxis);
};
