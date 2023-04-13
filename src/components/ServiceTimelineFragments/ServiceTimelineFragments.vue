<template>
  <div class="timeline-fragments" :style="computedStyles">
    <div class="timeline-fragments-header">这里是标题</div>
    <div class="timeline-steps-box">
      <div class="timeline-step" v-for="line in computedSteps" :key="line.key" :style="{ left: line.left }">
        <span class="timeline-step-scale">{{ line.scale }}</span>
      </div>
    </div>
    <div class="timeline-fragments-list">
      <el-collapse-transition v-for="frag in fragments" :key="frag.id">
        <service-timeline-fragments-item
          :time-range="timeRange"
          :gap="gap"
          :level="0"
          :fragment="frag"
          :left-width="leftWidth"
          :detail-max-height="detailMaxHeight"
          :detail-classes="detailClasses"
          ref="childrenRefs"
        />
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
import ServiceTimelineFragmentsItem from "@/components/ServiceTimelineFragments/ServiceTimelineFragmentsItem.vue";

export default {
  name: "ServiceTimelineFragments",
  components: { ServiceTimelineFragmentsItem },
  props: {
    fragments: {
      type: Array,
      default: () => []
    },
    timeRange: {
      type: Array,
      default: () => []
    },
    gap: {
      type: Number,
      default: 24
    },
    leftWidth: {
      type: Number,
      default: 400
    },
    headerHeight: {
      type: Number,
      default: 40
    },
    detailMaxHeight: {
      type: Number,
      default: 120
    },
    detailClasses: {
      type: String,
      default: ""
    },
    stepNum: {
      type: Number,
      default: 4
    },
    warningColor: {
      type: String,
      default: "#FC3452"
    }
  },
  data() {
    return {
      isTree: true
    };
  },
  computed: {
    computedStyles() {
      return {
        "--warning-color": this.warningColor,
        "--label-width": `${this.leftWidth}px`,
        "--header-height": `${this.headerHeight}px`
      };
    },
    computedSteps() {
      const len = Math.floor(this.stepNum) + 1;
      if (len < 2) {
        return [];
      }
      const steps = [];
      const stepItem = 100 / len;
      const [start, end] = this.timeRange;
      const maxRange = end - start;
      const stepScale = maxRange / len;
      for (let i = 0; i <= len; i++) {
        steps.push({
          key: i,
          left: `${stepItem * i}%`,
          scale: start + stepScale * i
        });
      }
      return steps;
    }
  },
  methods: {
    expandAll() {
      this.expandAllChildren();
      this.expandAllDetails();
    },
    collapseAll() {
      this.collapseAllChildren();
      this.collapseAllDetails();
    },
    expandAllChildren() {
      if (this.$refs.childrenRefs && this.$refs.childrenRefs.length) {
        this.$refs.childrenRefs.forEach((child) => child.expandAllChildren());
      }
    },
    collapseAllChildren() {
      if (this.$refs.childrenRefs && this.$refs.childrenRefs.length) {
        this.$refs.childrenRefs.forEach((child) => child.collapseAllChildren());
      }
    },
    expandAllDetails() {
      if (this.$refs.childrenRefs && this.$refs.childrenRefs.length) {
        this.$refs.childrenRefs.forEach((child) => child.expandAllDetails());
      }
    },
    collapseAllDetails() {
      if (this.$refs.childrenRefs && this.$refs.childrenRefs.length) {
        this.$refs.childrenRefs.forEach((child) => child.collapseAllDetails());
      }
    }
  }
};
</script>

<style lang="scss">
.timeline-fragments {
  position: relative;
  border-top: 1px solid #dcdcdc;
  border-right: 1px solid #dcdcdc;
  &::after {
    content: "";
    position: absolute;
    left: var(--label-width);
    top: 0;
    bottom: 0;
    width: 0;
    border-left: 1px solid #dcdcdc;
  }
  * {
    box-sizing: border-box;
  }

  .timeline-steps-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: var(--label-width);
  }
  .timeline-step {
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 1px solid #dcdcdc;
    line-height: var(--header-height);
    .timeline-step-scale {
      display: inline-block;
      margin-left: 10px;
      font-size: 14px;
    }
    &:last-child {
      .timeline-step-scale {
        transform: translateX(calc(-100% - 20px)); // 包含 margin 的 10px
      }
    }
  }
}
.timeline-fragments-header {
  height: var(--header-height);
  line-height: var(--header-height);
  padding: 0 8px;
  background-color: #eeeeee;
}
.timeline-fragments-list {
  position: relative;
  padding-left: 24px;
}

.timeline-fragment-item {
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
  grid-template-rows: 36px min-content auto;
  box-sizing: border-box;
  border-left: 1px solid #dcdcdc;
  position: relative;
  transition: all ease 0.2s;
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
    cursor: pointer;
    i {
      transition: all ease 0.2s;
    }
  }

  .item-title-box,
  .item-timeline-box,
  .item-cursor-box,
  .item-details-box {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .item-title-box,
  .item-cursor-box {
    position: relative;
    line-height: 36px;
    cursor: pointer;
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
    &.is-error {
      color: var(--warning-color);
    }
    //border-bottom: 1px solid #dcdcdc;
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
      font-size: 12px;
      color: #ffffff;
      text-align: center;
    }
  }
  .item-cursor-box.item-cursor-box {
    background-color: var(--bg-color);
  }
  .item-details-box {
    border-top: 0 solid var(--main-color);
    border-bottom: 0 solid #dcdcdc;
    transition-delay: 0s;
    background-color: #fefefe;
    &.expand {
      border-top-width: 4px;
      border-bottom-width: 1px;
      transition-delay: 0.2s;
    }
  }

  .item-timeline-box {
    //border-bottom: 1px solid #dcdcdc;
  }

  //  动画部分
  .item-cursor-box,
  .item-details-box {
    transition: border ease 0.2s, max-height ease 0.4s;
    overflow: hidden;
    &.with-height-translation {
      max-height: 0;
    }
    &.with-height-translation.expand {
      max-height: var(--detail-max-height);
    }
  }

  .details-content {
    height: calc(var(--detail-max-height) - 4px);
    box-sizing: border-box;
    padding: 8px;
    overflow-y: auto;
  }
}

.timeline-fragment-item + .timeline-fragment-item {
  padding-top: 4px;
}
</style>
