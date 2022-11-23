<template>
  <div class="demo-page">
    <div class="demo-content">
      <div class="around-box">
        <div class="center">center</div>

        <div class="star star-orbit"></div>

        <div
          :class="['star', { 'is-stop': useStop }]"
          v-for="(i, k) in stars"
          ref="starEls"
          :key="i"
          :style="{ '--star-index': i, '--ans-step': animationStep, '--ans-cycle': timeCycle + 'ms' }"
        >
          <div
            :class="['star-content', { 'is-active': activeIndex === k }]"
            ref="starContents"
            @click="clickStar(k)"
            @mouseenter="hoverStar(k)"
            @mouseleave="leaveStar"
          >
            <div class="details-box" v-show="activeIndex === k">
              <div>111111111111111</div>
              <div>111111111111111</div>
              <div>111111111111111</div>
              <div>111111111111111</div>
            </div>
            <div class="star-info-box">
              <div class="star-bg"></div>
              <div class="star-info">{{ i }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const PopperJS = require("element-ui/lib/utils/popper");
import { debounce } from "jsoneditor/src/js/util";

export default {
  name: "StarAround4",
  data() {
    return {
      timeCycle: 3 * 60 * 1000, // 3min
      stayTime: 1 * 60 * 1000, // 停留时间 3min
      useStop: false,
      animationStep: 0,
      activeIndex: -1,
      oldActiveIndex: -1,
      currentActiveTime: 0,
      stars: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      popoverMap: {}
      // stars: [1]
    };
  },
  mounted() {
    this.animationStep = this.timeCycle / this.stars.length;
    this.autoHighlight();
  },
  methods: {
    // 自动设置高亮
    autoHighlight(index = 0, timeSet) {
      // 激活序号
      this.activeIndex = this.oldActiveIndex = index;
      clearTimeout(this.autoTimer);
      // 下一个激活对象
      index = index - 1;
      index < 0 && (index = this.stars.length - 1);
      // 当前动画开始时刻
      this.currentActiveTime = new Date().getTime();
      // 如果有确定时间，则直接设置定时器
      if (timeSet) {
        this.autoTimer = setTimeout(() => {
          this.autoHighlight(index);
        }, timeSet);
      } else {
        this.calculateAnimationTime(index);
      }
    },
    // 计算动画时间
    calculateAnimationTime(nextIndex) {
      clearTimeout(this.calculateTimer);
      if (new Date().getTime() - this.currentActiveTime >= this.animationStep) {
        this.autoHighlight(nextIndex);
      } else {
        this.calculateTimer = setTimeout(() => this.calculateAnimationTime(nextIndex), 50);
      }
    },

    // 鼠标移入
    hoverStar(index) {
      // clearTimeout();
      // clearTimeout(this.timeout1);
      // clearTimeout(this.timeout2);
      // this.activeIndex = index;
      // this.oldActiveIndex = index;
    },
    // 鼠标离开
    leaveStar() {
      // this.activeIndex = -1;
    },
    // 鼠标单击，暂停 3min
    clickStar(k) {
      clearTimeout(this.autoTimer);
      this.useStop = true;
      this.activeIndex = k;
      const timeInterval = new Date().getTime() - this.currentActiveTime; // 之前的动画的已执行时间
      const remainingTime = this.animationStep - timeInterval;
      // 停止一定时间后重新开始
      this.stopTimer = setTimeout(() => {
        this.useStop = false;
        clearTimeout(this.stopTimer);
        this.autoHighlight(this.oldActiveIndex, (remainingTime > 50 && remainingTime - 50) || remainingTime);
      }, this.stayTime - 100);
    }
  }
};
</script>

<style scoped lang="scss">
.demo-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #010101;
  --dark-color: rgb(0, 0, 0);
  --glossy-red: rgba(238, 17, 17, 1);
  --light-red: rgba(238, 17, 17, 0.5);
  --very-light-red: rgba(238, 17, 17, 0.25);
  --planets-theme: var(--light-red) var(--light-red) var(--light-red) var(--glossy-red);
  --paths-theme: var(--very-light-red) var(--glossy-red);
}
.around-box {
  width: 100%;
  height: 100%;
  position: relative;
  transform: skewX(-20deg) rotateX(60deg);
  transform-origin: center;
  color: #ffffff;
}
.center {
  position: absolute;
  left: calc(50% - 300px);
  top: calc(50% - 300px);
  z-index: 100;
  width: 600px;
  height: 600px;
  transform: skewX(10.6deg) rotateX(0deg) scaleY(2);
  border-radius: 50%;
  background: linear-gradient(135deg, var(--glossy-red) 20%, transparent 100%);
  text-align: center;
  line-height: 240px;
}
.star {
  position: absolute;
  left: calc(50% - 450px);
  top: calc(50% - 450px);
  width: 900px;
  height: 900px;
  animation: solar-revolution var(--ans-cycle) linear infinite;
  animation-delay: calc(var(--ans-step) * var(--star-index) * -1s);
  pointer-events: none;
  &.is-stop {
    animation-play-state: paused;
    .star-content {
      animation-play-state: paused;
    }
  }
}
.star-orbit {
  animation: none;
  border-radius: 50%;
  border: 1px solid #2bc0e4;
  z-index: 10;
}
.star-content {
  position: absolute;
  //top: calc(50% - 24px);
  //left: -24px;
  left: calc(50% - 24px);
  bottom: -24px;
  width: 48px;
  height: 48px;

  animation: planets-rotation var(--ans-cycle) linear infinite;
  animation-delay: calc(var(--ans-step) * var(--star-index) * -1s);
  pointer-events: auto;
  &.is-active .star-info-box {
    transform: scale(2);
    background-color: #999999;
  }
}
.star-info-box {
  width: 100%;
  height: 100%;
  display: flex;
  background: #4179b7;

  border-width: 2px;
  border-style: solid;
  border-color: var(--planets-theme);
  border-radius: 50%;

  justify-content: center;
  align-items: center;
  transition: all linear 0.2s;
}
.details-box {
  position: absolute;
  left: 50%;
  bottom: 0;
  background-color: #8b5fda;
  transform: translate(-50%, 150%);
  box-sizing: border-box;
  padding: 16px;
}

@keyframes solar-revolution {
  0% {
    transform: rotate(0deg);
    z-index: 110;
  }
  50% {
    z-index: 80;
  }
  100% {
    transform: rotate(-360deg);
    z-index: 110;
  }
}
@keyframes planets-rotation {
  from {
    transform: rotate(-360deg) skewX(10.6deg) scaleY(2);
  }
  to {
    transform: rotate(0deg) skewX(10.6deg) scaleY(2);
  }
}
</style>
