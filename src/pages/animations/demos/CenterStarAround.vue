<template>
  <div class="center-star-around">
    <div class="center-earth-content">
      <div
        class="around-box"
        :style="{
          '--ans-step': animationStep,
          '--ans-cycle': timeCycle + 'ms'
        }"
      >
        <div class="center-earth"></div>
        <div class="center-orbit"></div>

        <div :class="['center-group-ball', { 'is-active': activeMiniIndex === -1 }]" @click="miniStarClick(-1)"></div>

        <div
          :class="['star', { 'is-stop': useStop, 'is-active': activeIndex === k }]"
          v-for="(item, k) in stars"
          :key="k"
          :style="{ '--star-index': k + 1 }"
        >
          <div
            :class="['star-content', { 'is-active': activeIndex === k }]"
            @mouseenter="showStarModel(k)"
            @click="starClick(item)"
          >
            <div class="details-box" v-show="activeIndex === k">111111111</div>
            <div class="star-bg-image"></div>
            <div class="star-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CenterStarAroundDemo",
  props: {
    timeCycle: {
      type: Number,
      default: 1 * 60 * 1000 // 1min
    },
    miniTimeCycle: {
      type: Number,
      default: 10 * 1000 // 20s
    },
    stayTime: {
      type: Number,
      default: 0.2 * 60 * 1000
    },
    stars: {
      type: Array,
      default: () => [1, 2, 3, 4, 5, 6, 7, 8, 10]
    },
    miniStars: {
      type: Array,
      default: () => []
    },
    hideHealth: {
      type: Boolean,
      default: false
    },
    useCenterClick: {
      type: Boolean,
      default: false
    },
    miniAround: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 外层球体部分
      useStop: false,
      animationStep: 0,
      activeIndex: -1,
      oldActiveIndex: -1,
      currentActiveTime: 0, // 某个动画的开始时间戳
      currentRemainingTime: null, // 点击操作时动画的剩余时间

      // 中心部分
      activeMiniIndex: null,
      miniAnimationStep: 0
    };
  },
  watch: {
    stars: {
      immediate: true,
      handler() {
        this.clearTimer();
        if (!this.stars || !this.stars.length) {
          this.animationStep = 0;
        } else {
          this.animationStep = this.timeCycle / this.stars.length;
          this.$nextTick(this.autoHighlight);
        }
      }
    },
    miniStars: {
      immediate: true,
      handler() {
        if (!this.miniStars || !this.miniStars.length) {
          this.miniAnimationStep = 0;
        } else {
          this.miniAnimationStep = this.miniTimeCycle / this.miniStars.length;
        }
        // 使用 点击事件时 默认是激活 中间的集团总览
        this.activeMiniIndex = this.useCenterClick ? -1 : null;
      }
    }
  },
  methods: {
    // 自动设置高亮
    autoHighlight(index = 0, timeSet) {
      console.log("autoHighlight");
      this.clearTimer();
      // 取消暂停
      this.useStop = false;
      // 当前动画开始时刻
      this.currentActiveTime = new Date().getTime();
      // 激活序号
      this.activeIndex = this.oldActiveIndex = index;
      // 下一个激活对象
      let nextIndex = index - 1;
      nextIndex < 0 && (nextIndex = this.stars.length - 1);
      // 清空剩余时间
      this.currentRemainingTime = null;
      // 设置定时器
      this.calculateAnimationTime(nextIndex, timeSet || this.animationStep);
    },
    // 计算动画时间(剩余时间)
    calculateAnimationTime(nextIndex, remainingTime) {
      console.log("calculateAnimationTime");
      this.clearTimer();
      if (new Date().getTime() - this.currentActiveTime >= remainingTime - 20) {
        this.autoHighlight(nextIndex);
      } else {
        this.calculateTimer = setTimeout(() => this.calculateAnimationTime(nextIndex, remainingTime), 20);
      }
    },
    // 鼠标单击，暂停 3min
    showStarModel(k) {
      this.clearTimer();
      this.useStop = true;
      this.activeIndex = k;
      // 之前的动画的已执行时间
      if (!this.currentRemainingTime) {
        console.log("currentRemainingTime", this.currentRemainingTime);
        const timeInterval = new Date().getTime() - this.currentActiveTime;
        this.currentRemainingTime = this.animationStep - timeInterval;
      }
      // 停止一定时间后重新开始
      this.stopTimer = setTimeout(() => {
        this.autoHighlight(this.oldActiveIndex, this.currentRemainingTime);
      }, this.stayTime);
    },
    clearTimer() {
      clearTimeout(this.stopTimer);
      clearTimeout(this.calculateTimer);
      this.stopTimer = null;
      this.calculateTimer = null;
    },

    starClick(item) {
      this.activeMiniIndex = null;
      this.$emit("star-click", item);
    },
    showMiniStarModel(k) {
      this.activeMiniIndex = k;
    },
    miniStarClick(index) {
      if (this.useCenterClick) {
        this.activeMiniIndex = index;
        if (index === -1) {
          this.$emit("center-click");
        } else {
          this.$emit("mini-star-click", index);
        }
      }
    }
  },
  beforeDestroy() {
    this.clearTimer();
  }
};
</script>

<style scoped lang="scss">
.center-star-around {
  width: 100%;
  height: 100%;
}
.center-earth-content {
  position: relative;
  width: 100%;
  padding-bottom: 89%;
  box-sizing: border-box;
  overflow: hidden;
}

.around-box {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transform: skewX(-20deg) rotateX(75deg) translateY(-20%) translateX(-2%);
  transform-origin: center;
  color: #ffffff;
  z-index: 100;
}
.center-earth {
  position: absolute;
  left: calc(50% - 220px);
  top: calc(50% - 220px);
  z-index: 100;
  width: 440px;
  height: 440px;
  transform: skewX(5.48deg) rotateX(0deg) scaleY(3.9);
  background-color: #2d8cf0;
  border-radius: 50%;
}
.center-orbit {
  position: absolute;
  left: calc(50% - 420px);
  top: calc(50% - 420px);
  z-index: 104;
  width: 840px;
  height: 840px;
  transform: skewX(5.48deg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-color: rgb(45, 240, 77, 0.2);
  border-radius: 50%;
  pointer-events: none;
}
.center-base {
  position: absolute;
  left: calc(50% - 240px);
  bottom: 0;
  width: 480px;
  height: 200px;
  background-color: #73255a;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 80;
  transform: skewX(5.48deg) rotateX(0deg) scaleY(3.2) translateY(120%) translateX(8%);
  pointer-events: none;
}

.star {
  position: absolute;
  left: calc(50% - 370px);
  top: calc(50% - 370px);
  width: 740px;
  height: 740px;
  //transform: rotateX(30deg) skewX(-10deg) rotateY(-10deg);
  animation: solar-revolution var(--ans-cycle) linear infinite;
  animation-delay: calc(var(--ans-step) * var(--star-index) * -1s);
  pointer-events: none;
  border-radius: 50%;
  &.is-stop {
    animation-play-state: paused;
    .star-content {
      animation-play-state: paused;
    }
  }
  &.is-active {
    z-index: 2000 !important;
  }
}
.star-content {
  position: absolute;
  left: calc(50% - 24px);
  bottom: -24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;

  animation: planets-rotation var(--ans-cycle) linear infinite;
  animation-delay: calc(var(--ans-step) * var(--star-index) * -1s);
  pointer-events: auto;
  &.is-active {
    left: calc(50% - 32px);
    bottom: -32px;
    width: 64px;
    height: 64px;
    .star-bg-image {
      background-color: #1b2735;
    }
  }
}
.star-bg-image {
  width: 100%;
  height: 100%;
  display: flex;

  background-color: #1b2735;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 50%;

  justify-content: center;
  align-items: center;
  transition: all linear 0.2s;
}
.star-name {
  text-align: center;
  font-weight: bold;
}
.details-box {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: max-content;
  transform: translate(-50%, calc(100% + 28px));
  box-sizing: border-box;
  padding: 12px 16px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(20, 50, 92, 0.8) 0%, rgba(7, 16, 52, 0.8) 100%);
  z-index: 30;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 12px;
  border: 1px solid #65bfff;
  font-size: 16px;
  word-break: normal;
  text-wrap: none;
  user-select: none;
  &::before {
    content: "";
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-bottom-color: #65bfff;
    position: absolute;
    top: 0;
    left: calc(50% - 8px);
    margin-top: -16px;
  }
  &::after {
    content: "";
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-bottom-color: #65bfff;
    position: absolute;
    top: 0;
    left: calc(50% - 6px);
    margin-top: -12px;
  }

  .detail-label {
    color: #65bfff;
  }
}

@keyframes solar-revolution {
  0% {
    transform: rotateX(34deg) skewX(-12deg) rotateY(-10deg) rotate(0deg);
    z-index: 120;
  }
  30% {
    z-index: 120;
  }
  50% {
    z-index: 90;
  }
  70% {
    z-index: 90;
  }
  80% {
    z-index: 120;
  }
  100% {
    transform: rotateX(34deg) skewX(-12deg) rotateY(-10deg) rotate(-360deg);
    z-index: 120;
  }
}
@keyframes planets-rotation {
  from {
    transform: rotate(-360deg) scaleY(4.2) skewX(51.045deg) skewY(1.66deg);
  }
  to {
    transform: rotate(0deg) scaleY(4.2) skewX(51.045deg) skewY(1.66deg);
  }
}
</style>
