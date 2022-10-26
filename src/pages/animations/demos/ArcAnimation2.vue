<template>
  <div class="ArcAnimation2">
    <p>
      <el-button @click="updateArray(false)">刷新数据</el-button>
      <el-button @click="updateArray(true)">自动刷新</el-button>
      <span>当前线段数量：{{ lineNum }}</span>
    </p>

    <div class="base-content">
      <div class="base-circle"></div>
      <div class="center-circle" :style="{ left: `${center.x}px`, top: `${center.y}px` }">
        <!--        {{ center }}-->
      </div>

      <div
        v-for="(dot, index) in arr"
        :key="`dot-${index}`"
        :class="[
          'dot',
          {
            'left-dot': dot.r < 0 || dot.r > 180,
            'right-dot': dot.r > 0 && dot.r < 180,
            'line-dot': dot.r === 0 || dot.r === 180 || dot.r === 360
          }
        ]"
        :style="{
          height: `${dot.c}px`,
          left: `${dot.x}px`,
          top: `${dot.y}px`,
          transform: `rotate(${dot.r}deg) translateX(-50%)`,
          '--inner-width': -dot.c / 6 + 'px'
        }"
      >
        {{ index }}
        <div class="dot-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArcAnimation2",
  data() {
    return {
      arr: [],
      width: 600,
      lineNum: 0,
      center: {
        x: 300,
        y: 240
      }
    };
  },
  created() {
    this.updateArray(false);
  },
  methods: {
    updateArray(timing) {
      const circleCenter = { x: this.width / 2, y: this.width / 2 };
      this.lineNum = Math.floor(Math.random() * 10 + 10);
      console.log("线段数量：", this.lineNum);
      this.arr = this.calcCircularLayout(this.lineNum, circleCenter, 300);
      if (timing) {
        this._timer = setTimeout(() => this.updateArray(true), 1000);
      } else {
        clearTimeout(this._timer);
      }
    },
    /**
     * 计算N个点均匀排列成圆的各个点坐标
     * @param size 参与排列成圆的元素个数
     * @param center 圆的中心点坐标 {x:, y:}
     * @param radius 圆的半径
     * @return *[] 各个元素的坐标
     */
    calcCircularLayout(size, center, radius) {
      const points = [];
      const newSize = size;

      // 中心点坐标
      const { x: centerX, y: centerY } = center;

      for (let i = 0; i < newSize; i++) {
        // 圆上的每个点的单位角度
        const avd = 360 / newSize;
        // 圆上的每个点的单位弧度
        const ahd = (avd * Math.PI) / 180;

        const x = Math.sin(ahd * i) * radius + centerX;
        const y = Math.cos(ahd * i) * radius + centerY;
        const { c, r } = this.calcDistanceOfCenter({ x, y });

        const point = { x, y, c, r, k: i };
        points.push(point);
      }
      return points;
    },
    /**
     *
     */
    calcDistanceOfCenter(node) {
      const { x: nodeX, y: nodeY } = node;
      const { x: centerX, y: centerY } = this.center;
      // 直角边 1 (横向边)
      const a = nodeX - centerX;
      // 直角边  2 (纵向边)
      const b = nodeY - centerY;
      // 计算斜边 (高度) 最后减去目标中心点的一半
      const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) - 30;
      // 计算角度
      let r = Math.floor(90 + (Math.atan2(nodeY - centerY, nodeX - centerX) * 180) / Math.PI);
      return { c, r };
    }
  }
};
</script>

<style scoped lang="scss">
.ArcAnimation2 {
  background-color: #010101;
  height: 100%;
  color: #ffffff;
}
p {
  line-height: 32px;
}

.base-content {
  margin: 20px auto;
  width: 600px;
  height: 600px;
  position: relative;
}
.base-circle {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid #8b5fda;
  position: relative;
  overflow: hidden;
}
.center-circle {
  position: absolute;
  width: 60px;
  height: 60px;
  transform: translateX(-50%) translateY(-50%);
  background-color: #2bc0e4;
  border-radius: 50%;
  z-index: 200;
}
.dot {
  width: 40px;
  position: absolute;
  transform-origin: top left;

  box-sizing: border-box;
  perspective: 100px;
  perspective-origin: center;

  text-align: center;
  line-height: 40px;
  .dot-inner {
    position: absolute;

    border-radius: 100%;
    border-style: solid;
    border-color: #8b5fda;
    filter: drop-shadow(0 0 8px rgba(139, 95, 218, 0.8));
  }
  &.left-dot .dot-inner,
  &.right-dot .dot-inner {
    top: 0;
    bottom: 0;
    left: var(--inner-width);
    right: var(--inner-width);
    //box-shadow: 0 0 8px 0 #8b5fda;
  }
  &.left-dot .dot-inner {
    border-width: 0 6px 0 0;
    transform: rotateY(45deg);
  }
  &.right-dot .dot-inner {
    border-width: 0 0 0 6px;
    transform: rotateY(-45deg);
  }

  &.line-dot .dot-inner {
    top: 6px;
    bottom: 6px;
    left: calc(50% - 1px);
    right: calc(50% - 1px);
    background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(139, 95, 218, 1) 20%,
      rgba(139, 95, 218, 1) 80%,
      rgba(0, 0, 0, 0)
    );
  }
}
</style>
