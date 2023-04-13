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
    <div
      class="item-cursor-box with-height-translation"
      :class="{ expand: showDetails }"
      @click="changeDetailsStatus"
    ></div>
    <div class="item-details-box with-height-translation" :class="{ expand: showDetails }">
      <div :class="['details-content', detailClasses]">
        <div>Tags:</div>
        <div>{{ (fragment.tags || []).join("，") }}</div>
        <div>Process:</div>
        <div>{{ fragment.process }}</div>
      </div>
    </div>
    <el-collapse-transition v-for="frag in fragment.children" :key="frag.id">
      <service-timeline-fragments-item
        v-show="showChildren"
        :gap="gap"
        :time-range="timeRange"
        :level="level + 1"
        :fragment="frag"
        :left-width="leftWidth"
        :detail-max-height="detailMaxHeight"
        :detail-classes="detailClasses"
        ref="childrenRefs"
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
      type: Number
    },
    detailMaxHeight: {
      type: Number
    },
    detailClasses: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tree: null,
      showDetails: false,
      showChildren: true
    };
  },
  computed: {
    computedStyles() {
      const offsetLeft = this.gap + 1; // 边框占据1像素
      const leftGap = offsetLeft * this.level + this.gap; // 累加左边距
      const color = this.color || this.fragment.color || randomHexColor();
      return {
        "--main-color": color,
        "--bg-color": color + "33",
        "--detail-max-height": `${this.detailMaxHeight}px`,
        width: `calc(100% - ${offsetLeft}px)`,
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
  created() {
    const parent = this.$parent;
    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }
  },
  methods: {
    changeDetailsStatus() {
      this.showDetails = !this.showDetails;
      if (this.showDetails) {
        this.tree.$emit("details-expanded", this.fragment, this);
      } else {
        this.tree.$emit("details-collapsed", this.fragment, this);
      }
    },
    changeChildrenStatus() {
      this.showChildren = !this.showChildren;
      if (this.showChildren) {
        this.tree.$emit("children-expanded", this.fragment, this);
      } else {
        this.tree.$emit("children-collapsed", this.fragment, this);
      }
    },
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
      this.$nextTick(() => {
        if (this.$refs.childrenRefs && this.$refs.childrenRefs.length) {
          this.$refs.childrenRefs.forEach((child) => child.expandAllChildren());
        }
      });
    },
    collapseAllChildren() {
      if (this.$refs.childrenRefs && this.$refs.childrenRefs.length) {
        this.$refs.childrenRefs.forEach((child) => child.collapseAllChildren());
      }
      this.showChildren = false;
    },
    expandAllDetails() {
      this.showDetails = true;
      this.$nextTick(() => {
        if (this.$refs.childrenRefs && this.$refs.childrenRefs.length) {
          this.$refs.childrenRefs.forEach((child) => child.expandAllDetails());
        }
      });
    },
    collapseAllDetails() {
      if (this.$refs.childrenRefs && this.$refs.childrenRefs.length) {
        this.$refs.childrenRefs.forEach((child) => child.collapseAllDetails());
      }
      this.showDetails = false;
    }
  }
};
</script>
