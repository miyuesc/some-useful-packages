<template>
  <div class="demo-page">
    <div class="demo-content">
      <div class="around-box">
        <div class="center">center</div>

        <div
          :class="['star', { 'is-stop': activeIndex >= 0 }]"
          v-for="(i, k) in stars"
          :key="i"
          :style="{ '--star-index': i, '--ans-step': animationStep }"
        >
          <el-popover
            placement="top-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
            v-model="popoverMap[k]"
          >
            <div
              :class="['star-content', { 'is-active': activeIndex === k }]"
              slot="reference"
              ref="starContents"
              @mouseenter="hoverStar(k)"
              @mouseleave="leaveStar"
            >
              <div class="star-info-box">
                <div class="star-bg"></div>
                <div class="star-info">{{ i }}</div>
              </div>
            </div>
          </el-popover>
        </div>
      </div>
    </div>

    <div class="info-tips" ref="tip">
      <p>11111111</p>
      <p>11111111</p>
      <p>11111111</p>
      <p>11111111</p>
    </div>
  </div>
</template>

<script>
// const PopperJS = require("element-ui/lib/utils/popper");
import { debounce } from "jsoneditor/src/js/util";

export default {
  name: "StarAround2",
  data() {
    return {
      timeCycle: 36, // 36s
      stayTime: 2000, // 2s
      animationStep: 0,
      activeIndex: -1,
      oldActiveIndex: -1,
      stars: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      popoverMap: {}
      // stars: [1]
    };
  },
  mounted() {
    this.animationStep = this.timeCycle / this.stars.length;
    this.initTimeout();
  },
  methods: {
    // 暂停
    initTimeout: debounce(function (index = 0) {
      this.oldActiveIndex = index;
      this.activeIndex = index;
      this.$set(this.popoverMap, index, true);

      // 恢复动画
      this.timeout1 = setTimeout(() => {
        this.$set(this.popoverMap, index, false);
        this.activeIndex = -1;
        index = index - 1;
        index < 0 && (index = this.stars.length - 1);
        this.timeout2 = setTimeout(() => {
          clearTimeout(this.timeout1);
          clearTimeout(this.timeout2);
          this.initTimeout(index);
          //  动画时长
        }, this.animationStep * 1000);

        //  暂停时长
      }, this.stayTime);
    }, 200),
    hoverStar(index) {
      clearTimeout();
      clearTimeout(this.timeout1);
      clearTimeout(this.timeout2);
      this.activeIndex = index;
      this.oldActiveIndex = index;
    },
    leaveStar() {
      this.activeIndex = -1;
      this.oldActiveIndex = this.oldActiveIndex - 1;
      this.oldActiveIndex < 0 && (this.oldActiveIndex = this.stars.length - 1);

      let leaveTimer = setTimeout(() => {
        this.initTimeout(this.oldActiveIndex);
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }, this.animationStep * 1000);
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
  overflow: hidden;
  position: relative;
  transform: skewX(-60deg);
  transform-origin: center;
  color: #ffffff;
}
.center {
  position: absolute;
  left: calc(50% - 120px);
  top: calc(50% - 120px);
  z-index: 100;
  width: 240px;
  height: 240px;
  transform: skewX(60deg);
  border-radius: 50%;
  background: linear-gradient(135deg, var(--glossy-red) 20%, transparent 100%);
  text-align: center;
  line-height: 240px;
}
.star {
  position: absolute;
  left: calc(50% - 223px);
  top: calc(50% - 223px);
  width: 446px;
  height: 446px;
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
  animation: solar-revolution 36s linear infinite;
  animation-delay: calc(var(--ans-step) * var(--star-index) * -1s);
  pointer-events: none;
  &.is-stop {
    animation-play-state: paused;
    .star-content {
      animation-play-state: paused;
    }
  }
}
.star-content {
  position: fixed;
  top: 118px;
  width: 36px;
  height: 36px;

  animation: planets-rotation 36s linear infinite;
  animation-delay: calc(var(--ans-step) * var(--star-index) * -1s);
  pointer-events: auto;
  &:hover .star-info-box,
  &.is-active .star-info-box {
    transform: scale(2);
    background-color: #999999;
  }
}
.star-info-box {
  width: 100%;
  height: 100%;
  display: flex;
  background: transparent;

  border-width: 2px;
  border-style: solid;
  border-color: var(--planets-theme);
  border-radius: 50%;

  justify-content: center;
  align-items: center;
  transition: all linear 0.2s;
}

@keyframes solar-revolution {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
@keyframes planets-rotation {
  from {
    transform: rotate(-360deg) skewX(60deg);
  }
  to {
    transform: rotate(0deg) skewX(60deg);
  }
}
</style>
