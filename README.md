# ui-lib
基于vue的组件库

# 安装

``` bash
 npm i zb-ul-lib -S
```

# 使用

使用 vue 安装 `zb-ui-lib`  

``` javascript
import UILib from 'zb-ui-lib';

Vue.use(UILib);
```

## 使用 TimeAxis

`<time-axis v-model="currentDate" v-bind="{ ...timeAxisOption }">`  

``` typescript
type Mode = "inline" | "top-ctrl" | "bottom-ctrl";

interface TimeAxisOption {
  mode: Mode;
  scale: number;
  startTime: Date;
  endTime: Date;
}


```




