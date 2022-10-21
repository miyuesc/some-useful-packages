<template>
  <div class="weighted-line-bar">
    <div class="bar__header" :style="computedHeaderStyle">
      <slot name="icon"></slot>
      <div v-if="!$slots.icon" class="bar__header-icon">{{ icon }}</div>
      <div class="bar__header-title">{{ title }}</div>
      <div v-if="!highlight" class="bar__header-data" :data-attr-unit="unit">{{ data }}</div>
      <highlight-text v-else :text="data" :unit="unit" :color="fontColor" :size="fontSize" />
    </div>
    <div class="bar__content" :style="computedBoxStyle">
      <div :class="computedBarClass" :style="computedBarStyle"></div>
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
import { getRawType } from "../../utils/tools";
import HighlightText from "@/components/HighlightText";

export default {
  name: "WeightedLineBar",
  components: { HighlightText },
  props: {
    data: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1
    },
    barHeight: {
      type: Number,
      default: 16
    },
    barPadding: {
      type: Number,
      default: 2
    },
    icon: {
      type: String,
      default: "1"
    },
    title: {
      type: String,
      default: ""
    },
    unit: {
      type: String
    },
    highlight: {
      type: Boolean,
      default: true
    },
    fontColor: {
      type: String,
      default: "#ffffff"
    },
    fontSize: {
      type: [String, Number],
      default: "20px"
    },
    color: {
      type: [String, Array],
      default: "#92e1fe"
    },
    bgColor: {
      type: String,
      default: "#33414c"
    }
  },
  computed: {
    computedBoxStyle() {
      let styles = {};
      styles["--box-color"] = this.bgColor;
      styles["--box-height"] = `${this.barPadding * 2 + this.barHeight}px`;
      styles["--bar-width"] = `${(this.data / this.max) * 100}%`;
      styles["--bar-padding"] = `${this.barPadding}px`;
      styles["--bar-height"] = `${this.barHeight}px`;
      return styles;
    },
    computedHeaderStyle() {
      let styles = {};
      styles["--font-color"] = this.fontColor;
      if (typeof this.fontSize === "number") {
        styles["--font-size"] = this.fontSize + "px";
      } else {
        styles["--font-size"] = this.fontSize;
      }
      return styles;
    },
    computedBarClass() {
      let classes = "bar__content-inner";
      if (
        getRawType(this.color) === "array" ||
        this.color.startsWith("radial") ||
        this.color.startsWith("linear") ||
        this.color.startsWith("repeating")
      ) {
        classes += " gradient-bg";
      }
      return classes;
    },
    computedBarStyle() {
      let styles = {};
      if (this.computedBarClass === "bar__content-inner") {
        styles["--bar-color"] = this.color;
      } else {
        if (getRawType(this.color) === "array") {
          styles["backgroundImage"] = `linear-gradient(to right, ${this.color.join(",")})`;
          styles["--bar-color"] = this.color[0];
        } else {
          styles["backgroundImage"] = this.color;
          styles["--bar-color"] = "#92e1fe";
        }
      }
      return styles;
    }
  }
};
</script>

<style scoped lang="scss">
.weighted-line-bar {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 12px;
}
.bar__header {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.bar__header-icon,
.bar__header-title,
.bar__header-data {
  color: var(--font-color);
  font-size: var(--font-size);
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bar__header-icon {
  border: 2px solid var(--font-color);
  padding: 0 4px 0 0;
}
.bar__header-title {
  flex: 1;
  text-align: left;
  padding-left: 1em;
}
.bar__header-data {
  padding-left: 1em;
  font-weight: bold;
  &::after {
    content: attr(data-attr-unit);
    display: inline-block;
    transform: scale(0.4);
    transform-origin: bottom left;
  }
}

.bar__content {
  width: 100%;
  height: var(--box-height);
  border-radius: calc(var(--box-height) / 2);
  background-color: var(--box-color);
  position: relative;
  .bar__content-inner {
    position: absolute;
    left: calc(var(--bar-padding) - 1px);
    top: var(--bar-padding);
    width: var(--bar-width);
    height: var(--bar-height);
    border-radius: calc(var(--bar-height) / 2);
    background-color: var(--bar-color);
    box-shadow: 0 0 calc(var(--bar-padding) + 4px) 0 var(--bar-color);
    transition: all ease-in-out 0.2s;
  }
}
</style>
