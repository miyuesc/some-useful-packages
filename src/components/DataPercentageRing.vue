<template>
  <div class="data-percentage-ring" style="width: 200px">
    <svg class="percentage-ring__svg" :width="diameterShow" :height="diameterShow" :viewbox="viewbox">
      <defs>
        <linearGradient id="linear-defs-01" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" :stop-color="colors[0]" />
          <stop offset="1" :stop-color="colors[1]" />
        </linearGradient>
      </defs>

      <circle
        :cx="size"
        :cy="size"
        :r="raduisActual + strokeWidth / 2"
        :stroke-width="strokeWidth / 2"
        stroke="#404040"
        fill="none"
      ></circle>
      <circle
        :cx="size"
        :cy="size"
        :r="raduisActual"
        :stroke-width="strokeWidth / 2"
        stroke="#eee"
        fill="none"
      ></circle>
      <circle
        v-if="rate"
        :cx="size"
        :cy="size"
        :r="raduisActual"
        :stroke-width="strokeWidth"
        :transform="transform"
        :stroke-dasharray="strokeDasharray"
        stroke="url(#linear-defs-01)"
        fill="none"
      ></circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: "DataPercentageRing",
  props: {
    // 圆环外圈的直径
    size: {
      default: 100
    },
    // 圆环的小宽度
    strokeWidth: {
      default: 20
    },
    // 圆环的颜色
    strokeColor: {
      default: "#00D476"
    },
    // 圆环显示的百分比 这边是小数
    rate: {
      default: 0.5
    },
    // 圆环里面的文字 这里的文字如果跟rate息息相关 可以放到computed计算
    text: {
      default: 50
    },
    // 圆环里面的文字的fontSize大小
    textSize: {
      default: 20
    },
    colors: {
      type: [String, Array],
      default: () => ["#149DFF", "#8EF9FD"]
    }
  },
  computed: {
    linearColors() {
      if (typeof this.colors === "string") {
        return [this.colors, this.colors];
      }
      return this.colors;
    },
    raduisActual() {
      return this.size - this.strokeWidth;
    },
    diameterShow() {
      return 2 * this.size;
    },
    viewbox() {
      return `0 0 ${this.diameterShow} ${this.diameterShow}`;
    },
    strokeDasharray() {
      const perimeter = Math.PI * 2 * this.raduisActual;
      const showLength = this.rate * perimeter;
      console.log(perimeter, showLength);
      return `${showLength} 1069`;
    },
    transform() {
      return `matrix(0,-1,1,0,0,${this.diameterShow})`;
    },
    textStyle() {
      let res = {};
      res.fontSize = `${this.textSize}px`;
      return res;
    }
  }
};
</script>
