<template>
  <svg width="1608" height="888" viewBox="0 0 1608 888">
    <defs>
      <marker
        id="marker-blue-end"
        viewBox="0 0 12 12"
        refX="6"
        refY="6"
        markerWidth="6"
        markerHeight="3"
        markerUnits="strokeWidth"
        orient="auto"
      >
        <polygon class="marker-blue" points="3,3 3,9 7,6" />
      </marker>
      <marker
        id="marker-green-end"
        viewBox="0 0 12 12"
        refX="6"
        refY="6"
        markerWidth="6"
        markerHeight="3"
        markerUnits="strokeWidth"
        orient="auto"
      >
        <polygon class="marker-green" points="3,3 3,9 7,6" />
      </marker>
    </defs>

    <g v-for="(line, index) in blueLines" :key="`blue-${index}`">
      <path :d="line.d" :class="line.class" />
      <rect x="-3" y="-3" width="6" height="6" fill="#fff" stroke-width="0">
        <animateMotion :dur="line.dur + 's'" repeatCount="indefinite" :path="line.d" />
      </rect>
    </g>

    <g v-for="(line, index) in greenLines" :key="`green-${index}`">
      <path :d="line.d" :class="line.class" />
      <rect x="-3" y="-3" width="6" height="6" fill="#fff" stroke-width="0">
        <animateMotion :dur="line.dur + 's'" repeatCount="indefinite" :path="line.d" />
      </rect>
    </g>
  </svg>
</template>

<script>
const blueLines = [
  {
    // 中间上
    d: "M 615,226 L 791,226 L 791,162",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 右上
    d: "M 1114,322 L 1114,84 L 876,84",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 左 4
    d: "M 542,582 L 542,301",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 左 1
    d: "M 106,582 L 106,440 L 247,440",
    class: "blue-line",
    dur: 4
  },
  {
    // 左 2
    d: "M 247,582 L 247,440 L 397,440",
    class: "blue-line",
    dur: 4
  },
  {
    // 左 3
    d: "M 397,582 L 397,440 L 542,440",
    class: "blue-line",
    dur: 4
  },
  {
    // 右 1
    d: "M 896,582 L 896,500 L 1128,500 L 1128,471",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 右 2
    d: "M 1046,582 L 1046,500",
    class: "blue-line",
    dur: 4
  },
  {
    // 右 3
    d: "M 1196,582 L 1196,500",
    class: "blue-line",
    dur: 4
  },
  {
    // 右 4
    d: "M 1346,582 L 1346,500 L 1128,500",
    class: "blue-line",
    dur: 4
  },
  {
    // 左下 1
    d: "M 247,755 L 247,717",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 左下 2
    d: "M 542,755 L 542,717",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 右下 1
    d: "M 1046,755 L 1046,717",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 右下 2
    d: "M 1346,755 L 1346,717",
    class: "blue-line with-blue-marker",
    dur: 4
  }
];

const greenLines = [
  {
    // 中间上
    d: "M 807,158 L 807,242 L 615,242",
    class: "green-line with-green-marker",
    dur: 4
  },
  {
    // 右上
    d: "M 872,68 L 1130,68 L 1130,318",
    class: "green-line with-green-marker",
    dur: 4
  }
];

export default {
  name: "SvgBgBox",
  data() {
    return {
      blueLines: blueLines,
      greenLines: greenLines
    };
  }
};
</script>

<style lang="scss">
svg {
  background-color: #101727;
}
.blue-line {
  fill: none;
  stroke: #8af6fd;
  stroke-width: 6px;
  stroke-linejoin: round;
}
.with-blue-marker {
  marker-end: url("#marker-blue-end");
}

.green-line {
  fill: none;
  stroke: #13e89e;
  stroke-width: 6px;
  stroke-linejoin: round;
}
.with-green-marker {
  marker-end: url("#marker-green-end");
}

.marker-blue {
  fill: #8af6fd;
  stroke: #8af6fd;
  stroke-width: 3px;
  stroke-linejoin: round;
}
.marker-green {
  fill: #13e89e;
  stroke: #13e89e;
  stroke-width: 3px;
  stroke-linejoin: round;
}
</style>
