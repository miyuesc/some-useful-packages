<template>
  <div class="timeline-fragment-item" :style="computedStyles">
    <div class="fragment-expand-btn" v-if="fragment.children && fragment.children.length" @click="changeChildrenStatus">
      <i class="el-icon-arrow-right" :style="{ transform: `rotate(${showChildren ? '90' : '0'}deg)` }" />
    </div>
    <div class="item-title-box" @click="changeDetailsStatus">
      <span>{{ fragment.label }}</span>
      <span style="font-size: 12px; color: #ccc; margin-left: 20px">{{ fragment.address }}</span>
    </div>
    <div class="item-timeline-box">
      <div class="timeline-inner" :style="computedInnerStyles"></div>
    </div>
    <el-collapse-transition>
      <div class="item-cursor-box" v-show="showDetails"></div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div class="item-details-box" v-show="showDetails">
        <div class="details-table">
          <div>Tags:</div>
          <div>{{ (fragment.tags || []).join("，") }}</div>
          <div>Process:</div>
          <div>{{ fragment.process }}</div>
        </div>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <service-timeline-fragments-item
        v-show="showChildren"
        v-for="frag in fragment.children"
        :key="frag.id"
        :gap="gap"
        :time-range="timeRange"
        :level="level + 1"
        :fragment="frag"
      />
    </el-collapse-transition>
  </div>
</template>

<script>
import { randomHexColor } from "../../../utils/colors";

export default {
  name: "ServiceTimelineFragmentsItem",
  props: {
    fragment: {
      type: Object,
      default: () => ({ children: [] })
    },
    timeRange: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 0
    },
    color: {
      type: String
    },
    gap: {
      type: Number
    },
    leftWidth: {
      type: Number,
      default: 320
    }
  },
  data() {
    return {
      showDetails: false,
      showChildren: true
    };
  },
  computed: {
    computedStyles() {
      const leftGap = (this.gap + 1) * this.level; // 边框占据1像素，且累加
      const color = this.color || this.fragment.color || randomHexColor();
      return {
        "--main-color": color,
        "--bg-color": color + "33",
        width: `calc(100% - ${leftGap}px)`,
        marginLeft: `${this.level > 0 ? this.gap : 0}px`,
        gridTemplateColumns: `${this.leftWidth - leftGap}px 1fr`
      };
    },
    computedInnerStyles() {
      const [start, end] = this.fragment.times;
      const [parentStart, parentEnd] = this.timeRange;
      const length = parentEnd - parentStart;
      return {
        left: `${(start * 100) / length}%`,
        right: `${100 - (end * 100) / length}%`
      };
    }
  },
  methods: {
    changeDetailsStatus() {
      this.showDetails = !this.showDetails;
    },
    changeChildrenStatus() {
      this.showChildren = !this.showChildren;
    }
  }
};
</script>

<style lang="scss">
.timeline-fragment-item {
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
  grid-template-rows: 36px min-content auto;
  box-sizing: border-box;
  border-left: 1px solid #eeeeee;
  margin-left: 24px; // 显示展开按钮
  position: relative;
  .fragment-expand-btn {
    position: absolute;
    left: -24px;
    top: 0;
    width: 20px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    transition: all ease 0.2s;
    cursor: pointer;
  }

  .item-title-box,
  .item-cursor-box {
    position: relative;
    line-height: 36px;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 4px;
      height: 100%;
      background-color: var(--main-color);
    }
  }
  .item-title-box {
    padding-left: 8px;
  }
  .item-timeline-box {
    width: 100%;
    height: 100%;
    position: relative;
    .timeline-inner {
      height: 12px;
      position: absolute;
      top: 12px;
      border-radius: 4px;
      background-color: var(--main-color);
    }
  }
  .item-cursor-box.item-cursor-box.item-cursor-box {
    background-color: var(--bg-color);
  }
  .item-details-box {
    padding: 8px;
    border-top: 4px solid var(--main-color);
  }

  .item-timeline-box,
  .item-details-box {
    border-bottom: 1px solid #eeeeee;
  }
}

.timeline-fragment-item + .timeline-fragment-item {
  padding-top: 4px;
}
</style>
