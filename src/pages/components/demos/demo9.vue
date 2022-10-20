<template>
  <div class="demo9">
    <data-percentage-ring />

    <template>
      <div class="parent-element-center">
        <svg :width="diameterShow" :height="diameterShow" :viewbox="viewbox">
          <circle
            :cx="size"
            :cy="size"
            :r="raduisActual"
            :stroke-width="strokeWidth"
            stroke="#404040"
            fill="none"
          ></circle>
          <circle
            :cx="size"
            :cy="size"
            :r="raduisActual + strokeWidth / 2"
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
            :stroke="strokeColor"
            fill="none"
            :transform="transform"
            :stroke-dasharray="strokeDasharray"
          ></circle>
        </svg>
        <div class="element-center" :style="textStyle">{{ text }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import DataPercentageRing from "@/components/DataPercentageRing";
export default {
  name: "demo9",
  cnName: "SVG 圆环图",
  components: { DataPercentageRing },
  data() {
    return {
      data: 76
    };
  },
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
    }
  },
  computed: {
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

<style scoped>
.parent-element-center {
  position: relative;
  display: inline-block;
}
.element-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  font-weight: bold;
}
</style>
