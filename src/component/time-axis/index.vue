<!--
 * @Description: TODO 
 * @Author: zb
 * @Date: 2023-08-04 14:35:13
 * @LastEditors: zb
 * @LastEditTime: 2023-08-06 22:03:47
-->

<script lang="tsx">
import { defineComponent } from "@vue/runtime-dom";
import moment from "moment";

export default defineComponent({
  name: "TimeAxis",
  filters: {
    dayLabel(value) {
      let label = "";
      switch (value) {
        case 1: {
          label = "周一";
          break;
        }
        case 2: {
          label = "周二";
          break;
        }
        case 3: {
          label = "周三";
          break;
        }
        case 4: {
          label = "周四";
          break;
        }
        case 5: {
          label = "周五";
          break;
        }
        case 6: {
          label = "周六";
          break;
        }
        case 7: {
          label = "周日";
          break;
        }
        default:
          break;
      }
      return label;
    },
  },
  props: {
    mode: {
      type: String,
      default: () => "inline",
    },
    scale: {
      type: Number,
      default: () => 4,
    },
    startTime: {
      type: [Date, Object],
      default: () => moment(moment().subtract(4, "d").format("yyyy-MM-DD 00")),
    },
    endTime: {
      type: [Date, Object],
      default: () => moment(moment().add(1, "d").format("yyyy-MM-DD 00")),
    },
    value: {
      type: [Date, Object],
      default: () => moment(moment().subtract(4, "d").format("yyyy-MM-DD 00")),
    },
    space: {
      type: Number,
      default: () => 0,
    },
    taskTimeout: {
      type: Number,
      default: () => 1000,
    },
    tooltipFormat: {
      type: String,
      default: () => "HH",
    },
  },
  data() {
    return {
      model: "",
      progressWidth: 0,
      fragmentWidth: this.space,
      isPlay: false,
      pickerOptions: {
        disabledDate: (date) => {
          return !moment(date).isBetween(
            this.startTime,
            this.endTime,
            undefined,
            "[)"
          );
        },
      },
    };
  },
  computed: {
    disabledLeft(): boolean {
      return moment(this.model).isSameOrBefore(this.startTime);
    },
    disabledRight(): boolean {
      return moment(this.endTime).isSameOrBefore(this.model);
    },
    timeAxisData(): object[] {
      const diff = moment(this.endTime).diff(this.startTime, "hours");

      return Array.from({ length: diff + 1 }, (i, index) => {
        const currentDate = moment(this.startTime).add(index, "h");
        return {
          time: currentDate,
          hours: currentDate.format("HH"),
          day: currentDate.format("E"),
          date: currentDate.date(),
          active: currentDate.isSameOrBefore(this.model, "hour"),
          selected: currentDate.isSame(this.model, "hour"),
        };
      });
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: "syncValue",
    },
  },
  mounted() {
    this.syncProgressWidth();
    this.mountEvent();
  },
  beforeUnmount() {
    this.unmountEvent();
  },
  methods: {
    syncValue(val): void {
      this.model = val;
    },
    syncProgressWidth() {
      this.$refs.progressBar &&
        (this.progressWidth = this.$refs.progressBar.offsetWidth);
      if (!this.fragmentWidth) {
        this.fragmentWidth =
          Math.floor(
            ((this.$refs.scaleBar.offsetWidth - 16) /
              this.timeAxisData.length) *
              1000
          ) / 1000;
      }
    },
    mountEvent() {
      window.addEventListener("resize", this.syncProgressWidth);
    },
    unmountEvent() {
      window.removeEventListener("resize", this.syncProgressWidth);
    },
    handleToLeft() {
      if (moment(this.model).isSameOrBefore(moment(this.startTime), "hour")) {
        this.model = moment(this.endTime).toDate();
      } else {
        this.model = moment(this.model).subtract(1, "h").toDate();
      }

      this.$emit("input", this.model);

      this.scrollProgressBar();
    },
    handleToRight() {
      if (moment(this.endTime).isSameOrBefore(moment(this.model), "hour")) {
        this.model = moment(this.startTime).toDate();
      } else {
        this.model = moment(this.model).add(1, "h").toDate();
      }
      this.$emit("input", this.model);
      this.scrollProgressBar();
    },
    handleSwitchPlay() {
      if (this.isPlay) {
        this.isPlay = false;
      } else {
        this.isPlay = true;
        this.runTimeTask();
      }
    },
    runTimeTask() {
      if (this.isPlay) {
        setTimeout(() => {
          this.handleToRight();
          this.runTimeTask();
        }, this.taskTimeout);
      }
    },
    async scrollProgressBar() {
      await this.$nextTick();
      if (!this.$refs.selectedNode) return false;

      const selfOffsetLeft = this.$refs.selectedNode.offsetLeft;
      const scrollLeft = this.$refs.progressBar.scrollLeft;
      const selfWidth = this.$refs.selectedNode.clientWidth;

      /* 判断是否在屏幕中 */
      let hideLeftWidth, hideRightWidth;
      if ((hideLeftWidth = scrollLeft - selfOffsetLeft + selfWidth) > 0) {
        this.$refs.progressBar.scrollLeft -= hideLeftWidth;
        return;
      }

      if (
        (hideRightWidth =
          selfOffsetLeft + selfWidth - scrollLeft - this.progressWidth) > 0
      ) {
        this.$refs.progressBar.scrollLeft += hideRightWidth;
      }
    },
    handleSelected({ time }) {
      this.model = time.toDate();
      this.$emit("input", this.model);
    },
    parseInputDate(date) {
      this.model = moment(date).add(24, "h").toDate();
    },
  },
  render(h) {
    return (
      <div
        ref="container"
        class={["time-axis__wapper", `time-axis__wapper--${this.mode}`]}
      >
        <div class="time-axis__control">
          <div class="el-button-group">
            <el-button type="text" circle onClick={this.handleSwitchPlay}>
              <i
                class={{
                  "el-icon-video-play": !this.isPlay,
                  "el-icon-video-pause": this.isPlay,
                }}
              ></i>
            </el-button>
            <el-button type="text" circle onClick={this.handleToLeft}>
              <i class="el-icon-caret-left"></i>
            </el-button>
            <el-button type="text" circle onClick={this.handleToRight}>
              <i class="el-icon-caret-right"></i>
            </el-button>
          </div>
          <slot>
            <el-date-picker
              clearable={false}
              value={moment(this.model).subtract(24, "h")}
              onInput={this.parseInputDate}
              type="date"
              size="mini"
              placeholder="选择日期"
              picker-options={this.pickerOptions}
            ></el-date-picker>
          </slot>
        </div>
        <div ref="scaleBar" class="time-axis__scale-bar">
          <div class="time-axis__scale-bar--inner">
            <div ref="progressBar" class="progress-bar">
              {this.timeAxisData.map((day, index) => {
                return (
                  <div
                    ref={day?.selected && "selectedNode"}
                    key={"progress-bar__fragment" + index}
                    class={{
                      "progress-bar__fragment": true,
                      "progress-bar__fragment--active": day?.active,
                      "progress-bar__fragment--selected": day?.selected,
                    }}
                    style={{
                      width: `${
                        index + 1 !== this.timeAxisData.length
                          ? this.fragmentWidth
                          : 0
                      }px`,
                    }}
                  >
                    <el-tooltip
                      content={moment(day.time).format(this.tooltipFormat)}
                      placement="top"
                      popper-class={"progress-bar__node--tooltip"}
                    >
                      <div
                        class={{
                          "progress-bar__node": true,
                          "progress-bar__node--day": day.hours === "00",
                        }}
                        onClick={this.handleSelected.bind(this, day)}
                      ></div>
                    </el-tooltip>
                  </div>
                );
              })}
            </div>

            <ul class="scale-wapper">
              {this.timeAxisData
                .filter(
                  (i, index) =>
                    index !== this.timeAxisData.length - 1 && index % 24 === 0
                )
                .map((day) => {
                  return (
                    <li class="scale__item">
                      <div class="scale-line">
                        {Array.from({ length: 24 }, (i, index) => index)
                          .filter((i) => i !== 0 && i % this.scale === 0)
                          .map((i) => {
                            return (
                              <div
                                class="scale-line__item"
                                style={{ left: `${this.fragmentWidth * i}px` }}
                              >
                                {i}
                              </div>
                            );
                          })}
                      </div>
                      <div class="detail-date">
                        <span>{day.time.format("yyyy-MM-DD")}</span>
                        <span>
                          {this.$options.filters.dayLabel(
                            Number.parseInt(day.day)
                          )}
                        </span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  },
});
</script>
