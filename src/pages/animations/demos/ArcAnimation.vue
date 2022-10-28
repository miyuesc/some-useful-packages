<template>
  <div class="ArcAnimation">
    <h1>ArcAnimation Page</h1>
    <p>
      <el-button @click="updateStyle(0)">椭圆路径</el-button>
      <el-button @click="updateStyle(1)">二次贝塞尔曲线</el-button>
      <el-button @click="updateStyle(2)">三次贝塞尔曲线</el-button>
    </p>
    <p>
      <el-button @click="updateArray()">刷新数据</el-button>
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

          <circle r="4" cx="0" cy="0" fill="#fff" />
          <!--          <circle r="30" cx="0" cy="-60" fill="#2bc0e4" />-->
          <!--          <circle r="296" cx="0" cy="0" fill="none" stroke="#2bc0e4" stroke-width="4px" />-->
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
      style: 0,
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
    updateArray() {
      const length = Math.floor(Math.random() * 10 + 10);
      const center = { x: 0, y: 0 };
      this.arr = this.calcCircularLayout(length, center, 296);
    },
    updateStyle(style) {
      this.style = style;
      this.arr.forEach((item) => (item.path = this.computedDotPath(item)));
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
    },

    computedDotPath({ x, y }) {
      const centerX = 0;
      const centerY = -60;
      if (this.style === 0) {
        // 1. 椭圆方式
        const ellipseH = x - centerX;
        const ellipseV = y - centerY;
        // 一象限
        let ellipseC = "0 0 1";
        // 二象限
        if (ellipseH > 0 && ellipseV < 0) {
          ellipseC = "0 0 1";
        }
        // 三象限、四象限
        if (ellipseH < 0 && ellipseV < 0) {
          ellipseC = "0 0 0";
        }
        // 四象限
        if (ellipseH < 0 && ellipseV > 0) {
          ellipseC = "0 0 0";
        }
        return `M0,-60 A ${Math.abs(ellipseH)} ${Math.abs(ellipseV)} ${ellipseC} ${x} ${y}`;
      }
      if (this.style === 1) {
        // 2. 二次次贝赛尔曲线
        let controlX = 0;
        let controlY = 0;
        // 上半部分
        if (y < -60) {
          controlX = x / 5;
          controlY = (y - centerY) / 0.9;
        } else {
          // 下半部分
          controlX = x;
          controlY = y < 0 ? y - 20 : y / 1.8;
        }
        return `M0,-60 Q${controlX},${controlY}  ${x},${y}`;
      }

      // 3. 三次贝赛尔曲线
      let controlX1 = (centerX + x) * 0.1;
      let controlX2 = x;
      let controlY1 = centerY / 2;
      let controlY2 = (centerY + y) / 2;
      if (y < centerY) {
        controlX1 = x / 2;
        controlX2 = x / 2;
        controlY1 = y / 1.2;
        controlY2 = y / 1.2;
      }
      return `M0,-60 C${controlX1},${controlY1} ${controlX2},${controlY2} ${x},${y}`;
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
