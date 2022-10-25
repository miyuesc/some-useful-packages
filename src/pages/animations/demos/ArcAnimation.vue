<template>
  <div class="ArcAnimation">
    <h1>ArcAnimation Page</h1>
    <p>
      <el-button @click="updateArray(false)">刷新数据</el-button>
      <el-button @click="updateArray(true)">自动刷新</el-button>
    </p>

    <div style="display: flex">
      <div class="base-content">
        <div class="base-circle"></div>
        <div class="center-circle"></div>

        <div class="dot" v-for="(i, index) in arr" :key="`dot-${index}`" :style="computedDotStyle(index)">
          <div class="dot-inner" :style="computedDotInnerStyle(index)"></div>
          {{ index }}
        </div>
      </div>

      <div class="base-content">
        <svg :viewBox="`-${width / 2} -${width / 2} ${width} ${width}`">
          <g v-for="i in arr" :key="i.k">
            <path :d="i.path" fill="none" stroke="#c4605f" stroke-width="4px"></path>
            <circle r="5" fill="#af4">
              <animateMotion dur="4s" repeatCount="indefinite" :path="i.path" />
            </circle>
          </g>
          <circle r="30" cx="0" cy="-60" fill="#2bc0e4" />
          <circle r="296" cx="0" cy="0" fill="none" stroke="#2bc0e4" stroke-width="4px" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArcAnimation",
  data() {
    return {
      arr: [],
      width: 600
    };
  },
  computed: {
    computedDotStyle() {
      const length = this.arr.length;
      return (index) => {
        const rotate = (360 / length) * index;
        return { transform: `rotate(${rotate}deg)` };
      };
    },
    computedDotInnerStyle() {
      const length = this.arr.length;
      return (index) => {
        const rotate = (360 / length) * index;
        let borderRadius = "";
        if (rotate === 0 || Math.abs(rotate - 180) < 2) {
          return { borderRadius: 0, left: "calc(50% - 2px)" };
        }
        if (rotate < 180) {
          borderRadius = "100% 0% 0% 100% / 50% 100% 0% 50% ";
          return { borderRadius, left: 0 };
        }
        borderRadius = "0% 100% 100% 0% / 50% 50% 50% 50% ";
        return { borderRadius, right: 0 };
      };
    }
  },
  created() {
    this.updateArray(false);
  },
  methods: {
    updateArray(timing) {
      const length = Math.floor(Math.random() * 10 + 10);
      const center = { x: 0, y: 0 };
      this.arr = this.calcCircularLayout(length, center, 296);
      timing && setTimeout(this.updateArray, 2000);
    },

    computedDotPath({ x, y }) {
      const centerX = 0;
      const centerY = -60;
      let controlX = (centerX + x) / 1.4;
      let controlY = (centerY + y) / 2;
      if (y < -60) {
        controlX = x / 2;
        controlY = y / 1.2;
      }
      return `M0,-60 C${controlX},${controlY} ${controlX},${controlY} ${x},${y}`;
    },
    /**
     * 计算N个点均匀排列成圆的各个点坐标
     * @param nodeSize 参与排列成圆的元素个数
     * @param center 圆的中心点坐标 {x:, y:}
     * @param radius 圆的半径
     * @return 各个元素的坐标：[{x:, y:}, {x:, y:}, ...]
     */
    calcCircularLayout(nodeSize, center, radius) {
      let i;
      let _i;
      let _layouts = [];
      for (i = _i = 0; _i < nodeSize; i = ++_i) {
        let x = center.x + radius * Math.sin((2 * Math.PI * i) / nodeSize);
        let y = center.y + radius * Math.cos((2 * Math.PI * i) / nodeSize);
        _layouts.push({ x: x, y: y, k: i, path: this.computedDotPath({ x, y }) });
      }

      return _layouts;
    }
  }
};
</script>

<style scoped lang="scss">
.base-content {
  width: 600px;
  height: 600px;
  background-color: rgba(1, 1, 1, 0.4);
  overflow: hidden;
  position: relative;
}
.base-circle {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid #ffffff;
  position: relative;
  overflow: hidden;
}
.center-circle {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 60px;
  height: 60px;
  transform: translateX(-50%) translateY(-50%);
  background-color: #2bc0e4;
  border-radius: 50%;
  z-index: 20;
}
.dot {
  width: 40px;
  height: 50%;
  text-align: center;
  line-height: 40px;
  position: absolute;
  top: 2px;
  left: calc(50% - 20px);
  transform-origin: bottom center;
  overflow: hidden;
  .dot-inner {
    width: 100%;
    border-color: #8b5fda;
    border-style: solid;
    border-width: 4px;
    position: absolute;
    top: -4px;
    bottom: 0;
  }
}
.min-dot {
  width: 40px;
  height: 50%;
  text-align: center;
  line-height: 40px;
  position: absolute;
  top: 2px;
  left: calc(50% - 20px);
  transform-origin: bottom center;
  overflow: hidden;
  .dot-inner {
    width: 100%;
    height: 50%;
    border-color: #31a12a;
    border-style: solid;
    border-width: 4px;
    position: absolute;
    bottom: 0;
  }
}
</style>
