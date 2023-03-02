<template>
  <svg width="1608" height="1140" viewBox="0 0 1608 1140" preserveAspectRatio="none">
    <defs>
      <radialGradient id="marker-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style="stop-color: #13e89e" />
        <stop offset="100%" style="stop-color: #13e89e" />
      </radialGradient>
    </defs>
    <g v-for="(line, index) in blueLines" :key="`blue-${index}`">
      <path :d="line.d" :class="line.class" />
    </g>
    <g v-for="(line, index) in blueLines" :key="`blue-mask-${index}`">
      <path :d="`M ${line.d[0]} L ${line.d.split(0, 1).join(' ')}`" :class="line.class" fill="none" />
      <circle cx="0" cy="0" r="4" fill="url(#marker-grad)" stroke-width="0">
        <animateMotion :dur="line.dur + 's'" repeatCount="indefinite" :path="line.d" />
      </circle>
    </g>
  </svg>
</template>

<script>
const lines = [
  {
    // 中间上
    d: "840,179 840,246",
    class: "blue-line",
    dur: 2
  },
  {
    // 中右上
    d: "840,179 840,200 1250,200 1250,478",
    class: "blue-line",
    dur: 6
  },
  {
    // 中右
    d: "920,308 1044,308",
    class: "blue-line",
    dur: 2
  },
  {
    // 中左
    d: "752,308 628,308",
    class: "blue-line",
    dur: 2
  },

  {
    // 左 1
    d: "840,416 840,500 556,500 172,500 172,940",
    class: "blue-line",
    dur: 8
  },
  {
    // 左 2
    d: "840,416 840,500 556,500 556,500 360,500 360,722",
    class: "blue-line",
    dur: 7
  },
  {
    // 左 3
    d: "840,416 840,500 556,500 556,940",
    class: "blue-line",
    dur: 5
  },
  {
    // 左 4
    d: "840,416 840,500 729,500 729,722",
    class: "blue-line",
    dur: 4
  },
  {
    // 左下 1
    d: "360,900 360,940",
    class: "blue-line",
    dur: 2
  },
  {
    // 左下 2
    d: "729,900 729,940",
    class: "blue-line",
    dur: 2
  },

  {
    // 右 1
    d: "1250,646 1250,666 896,666 896,940",
    class: "blue-line",
    dur: 5
  },
  {
    // 右 2
    d: "1250,646 1250,666 1046,666 1046,722",
    class: "blue-line",
    dur: 3
  },
  {
    // 右 3
    d: "1250,646 1250,666 1196,666 1196,940",
    class: "blue-line",
    dur: 4
  },
  {
    // 右 4
    d: "1250,646 1250,666 1346,666 1346,722",
    class: "blue-line",
    dur: 3
  },
  {
    // 右下 1
    d: "1046,900 1046,940",
    class: "blue-line",
    dur: 2
  },
  {
    // 右下 2
    d: "1346,900 1346,940",
    class: "blue-line",
    dur: 2
  }
];
export default {
  name: "SvgBoxBg2",
  data() {
    const blueLines = lines.map((item) => {
      const newPath = item.d.split(" ").reverse();
      const [mPoint, ...lPoints] = newPath;
      return {
        d: `M ${mPoint} L ${lPoints.join(" ")}`,
        class: item.class,
        dur: item.dur
      };
    });

    return {
      blueLines
    };
  }
};
</script>

<style scoped>
.blue-line {
  fill: none;
  stroke: #5e7894;
  stroke-width: 1px;
  stroke-linejoin: round;
}
</style>
