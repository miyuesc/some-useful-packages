<template>
  <div class="timeline-fragments" :style="computedStyles">
    <el-collapse-transition v-for="frag in fragments" :key="frag.id">
      <service-timeline-fragments-item
        :time-range="timeRange"
        :gap="gap"
        :level="0"
        :fragment="frag"
        :left-width="leftWidth"
        ref="childrenRefs"
      />
    </el-collapse-transition>
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
    }
  },
  computed: {
    computedStyles() {
      return {
        "--label-width": `${this.leftWidth}px`
      };
    }
  },
  created() {
    this.isTree = true;
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
      this.showChildren = true;
      this.$refs.childrenRefs &&
        this.$refs.childrenRefs.length &&
        this.$refs.childrenRefs.forEach((child) => child.expandAllChildren());
    },
    collapseAllChildren() {
      this.showChildren = false;
      this.$refs.childrenRefs &&
        this.$refs.childrenRefs.length &&
        this.$refs.childrenRefs.forEach((child) => child.collapseAllChildren());
    },
    expandAllDetails() {
      this.showDetails = true;
      this.$refs.childrenRefs &&
        this.$refs.childrenRefs.length &&
        this.$refs.childrenRefs.forEach((child) => child.expandAllDetails());
    },
    collapseAllDetails() {
      this.showDetails = false;
      this.$refs.childrenRefs &&
        this.$refs.childrenRefs.length &&
        this.$refs.childrenRefs.forEach((child) => child.collapseAllDetails());
    }
  }
};
</script>

<style lang="scss">
.timeline-fragments {
  position: relative;
  padding-left: 24px;
  &::after {
    content: "";
    position: absolute;
    left: var(--label-width);
    top: 0;
    bottom: 0;
    width: 0;
    border-left: 1px solid #eeeeee;
  }
  * {
    box-sizing: border-box;
  }
}

.timeline-fragment-item {
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
  grid-template-rows: 36px min-content auto;
  box-sizing: border-box;
  border-left: 1px solid #eeeeee;
  margin-left: 24px; // 显示展开按钮
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
    transition: all ease 0.2s;
    cursor: pointer;
  }

  .item-title-box,
  .item-cursor-box,
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
    border-top: 0 solid var(--main-color);
    transition-delay: 0s;
    &.expand {
      border-top-width: 4px;
      transition-delay: 0.4s;
    }
  }

  .item-timeline-box,
  .item-details-box {
    border-bottom: 1px solid #eeeeee;
  }

  //  动画部分
  .item-cursor-box,
  .item-details-box {
    transition: border ease 0.2s, max-height ease 0.6s;
    overflow: hidden;
    &.with-height-translation {
      max-height: 0;
    }
    &.with-height-translation.expand {
      max-height: 200px;
    }
  }
}

.timeline-fragment-item + .timeline-fragment-item {
  padding-top: 4px;
}
</style>
