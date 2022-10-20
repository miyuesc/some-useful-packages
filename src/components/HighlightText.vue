<template>
  <span
    :class="['highlight-text', { 'with-unit': !!unit, lighting: lighting }]"
    v-bind="{ 'data-attr-unit': !!text && unit }"
    :style="computedStyle"
    >{{ computedText }}</span
  >
</template>

<script>
export default {
  name: "HighlightText",
  props: {
    text: {
      type: [String, Number],
      default: ""
    },
    color: {
      type: String,
      default: "#010101" // #BCE3FF
    },
    size: {
      type: [String, Number],
      default: 12
    },
    separator: {
      type: Boolean,
      default: true
    },
    bolder: {
      type: Boolean,
      default: true
    },
    lighting: {
      type: Boolean,
      default: true
    },
    unit: {
      type: String,
      default: ""
    }
  },
  computed: {
    computedText() {
      if (typeof this.text === "number" && this.separator) {
        return this.text.toLocaleString();
      }
      return this.text;
    },
    computedStyle() {
      let fontSize = this.size;
      let fontWeight = "normal";
      const color = this.color;
      if (typeof fontSize === "number") {
        fontSize += "px";
      }
      if (this.bolder) {
        fontWeight = "bold";
      }
      return { fontSize, fontWeight, color, lineHeight: fontSize };
    }
  }
};
</script>

<style scoped lang="scss">
.highlight-text {
  font-family: Akrobat-Black, Akrobat, sans-serif;
  user-select: none;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &.lighting {
    text-shadow: 0 0 6px;
  }
  &.with-unit {
    &::after {
      content: attr(data-attr-unit);
      display: inline-block;
      transform: scale(0.4);
      transform-origin: bottom left;
    }
  }
}
</style>
