<template>
  <svg width="1608" height="888" viewBox="0 0 1608 888" preserveAspectRatio="none">
    <defs>
      <radialGradient id="marker-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style="stop-color: #ffffff" />
        <stop offset="100%" style="stop-color: #ffffff00" />
      </radialGradient>
    </defs>
    <g v-for="(line, index) in blueLines" :key="`blue-${index}`">
      <path :d="line.d" :class="line.class" />
      <circle cx="0" cy="0" r="8" fill="url(#marker-grad)" stroke-width="0">
        <animateMotion :dur="line.dur + 's'" repeatCount="indefinite" :path="line.d" />
      </circle>
    </g>
  </svg>
</template>

<script>
const blueLines = [
  {
    // 中间上
    d: "M 600,142 L 380,186 ",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 中右上
    d: "M 620,142 L 1114,340",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 左 1
    d: "M 330,301 L 106,582",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 左 2
    d: "M 360,301 L 247,582",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 左 3
    d: "M 390,301 L 397,582",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 左 4
    d: "M 420,301 L 542,582",
    class: "blue-line with-blue-marker",
    dur: 4
  },
  {
    // 右 1
    d: "M 1070,471 L 896,582",
    class: "blue-line with-blue-marker",
    dur: 3
  },
  {
    // 右 1
    d: "M 1100,471 L 1046,582",
    class: "blue-line with-blue-marker",
    dur: 3
  },
  {
    // 右 1
    d: "M 1130,471 L 1196,582",
    class: "blue-line with-blue-marker",
    dur: 3
  },
  {
    // 右 1
    d: "M 1160,471 L 1346,582",
    class: "blue-line with-blue-marker",
    dur: 3
  },
  {
    // 左下 1
    d: "M 247,717 L 247,755",
    class: "blue-line with-blue-marker",
    dur: 1
  },
  {
    // 左下 2
    d: "M 542,717 L 542,755",
    class: "blue-line with-blue-marker",
    dur: 1
  },
  {
    // 右下 1
    d: "M 1046,717 L 1046,755",
    class: "blue-line with-blue-marker",
    dur: 1
  },
  {
    // 右下 2
    d: "M 1346,717 L 1346,755",
    class: "blue-line with-blue-marker",
    dur: 1
  }
];
export default {
  name: "SvgBoxBg",
  data() {
    return {
      blueLines
    };
  }
};
</script>

<style scoped>
.blue-line {
  fill: none;
  stroke: #8af6fd;
  stroke-width: 2px;
  stroke-linejoin: round;
}
</style>
