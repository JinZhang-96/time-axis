/*
 * @Description: TODO
 * @Author: zb
 * @Date: 2023-08-04 09:12:58
 * @LastEditors: zb
 * @LastEditTime: 2023-08-04 10:48:44
 */
import moment from "moment";
import { expect, test } from 'vitest'

test("日期转换", () => {
  expect(moment().format("yyyy-MM-DD")).toBe("2023-08-04");
});

test("获取日期", () => {
  expect(moment().subtract(3, 'days').format("yyyy-MM-DD")).toBe("2023-08-01");
});