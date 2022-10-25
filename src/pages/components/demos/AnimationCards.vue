<template>
  <div class="AnimationCards">
    <h1>AnimationCards Page</h1>
    <p>
      <el-button @click="resetData">乱序</el-button>
    </p>

    <div class="demo-content">
      <div class="animation-cards-box">
        <div
          v-for="(styles, index) in cards"
          :class="[
            'animation-card',
            { 'is-active': activeIndex === index, 'is-clutter': clutter, 'is-list': !clutter }
          ]"
          :key="index"
          :style="{ ...styles }"
          @click="activeIndex = activeIndex === index ? -1 : index"
        >
          <span>Card {{ index }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { randomRgbColor } from "../../../../utils/colors";

export default {
  name: "AnimationCards",
  data() {
    return {
      activeIndex: -1,
      clutter: true, // 杂乱
      cards: []
    };
  },
  created() {
    this.initData();
  },
  mounted() {
    let addIndex = () => {
      if (this.activeIndex < this.cards.length - 1) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0;
      }
    };
    let lessIndex = () => {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      } else {
        this.activeIndex = this.cards.length - 1;
      }
    };
    let keyboardDeal = (e) => {
      // 方向键--上
      if (e.keyCode === 38) {
        addIndex();
      }
      // 方向键--下
      if (e.keyCode === 40) {
        lessIndex();
      }
      // 方向键--左
      if (e.keyCode === 37) {
        lessIndex();
      }
      // 方向键--右
      if (e.keyCode === 39) {
        addIndex();
      }
    };

    window.addEventListener("keyup", keyboardDeal);
    this.$on("hook:beforeDestroy", () => {
      window.removeEventListener("keyup", keyboardDeal);
    });
  },
  methods: {
    initData() {
      const arr = new Array(12).fill(1);
      this.cards = arr.map((_, index) => {
        return this.computedStyle(index, 12);
      });
    },
    resetData() {
      this.clutter = !this.clutter;
      this.initData();
    },
    computedStyle(index, length) {
      const clutter = this.clutter;
      const defaultStyles = { "--max-index": length + 1, "--bg-color": randomRgbColor(), "--card-index": index };

      if (clutter) {
        let rotate = 0;
        if (index % 2 === 1) {
          rotate = length - index;
        } else {
          rotate = index - length;
        }
        defaultStyles["--rotate-deg"] = rotate + "deg";
      } else {
        defaultStyles["left"] = `${16 * ++index}px`;
      }

      return defaultStyles;
    }
  }
};
</script>

<style lang="scss">
.demo-content {
  margin: 20px auto;
  width: 50vw;
  height: 400px;
}
.animation-cards-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: #d2d2d2;
  position: relative;
  perspective: 1px;
  ::-webkit-scrollbar {
    height: 0;
  }

  .animation-card {
    width: 200px;
    background-color: var(--bg-color);
    border-radius: 8px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    bottom: 20px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.8);
    transition: all ease-in-out 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    z-index: var(--card-index);

    &.is-list {
      animation: reject ease-in-out 0.4s;
      &:hover {
        & ~ .animation-card {
          transform: translateX(24px);
        }
      }
      &.is-active {
        z-index: var(--max-index) !important;
        animation: eject ease-in-out 0.4s;
        transform: translateX(calc(var(--max-index) * 20px - var(--card-index) * 20px - 40px));
      }
    }

    &.is-clutter {
      transform: translateX(0%) rotate(var(--rotate-deg));
      transform-origin: bottom center;
      &.is-active {
        animation: rotation ease-in-out 0.8s;
        transform: translateX(calc(120%)) rotate(0deg);
        z-index: var(--max-index) !important;
      }
    }
  }
}

@keyframes eject {
  50% {
    transform: translateX(calc(-100% - 20px)) rotate(-20deg);
  }
}
@keyframes reject {
  50% {
    transform: translateX(calc(100% + 20px)) rotate(10deg);
  }
}

@keyframes rotation {
  0% {
    transform: translateX(0%) rotate(var(--rotate-deg));
  }
  60% {
    transform: translateX(calc(130%)) rotate(2deg);
  }
  70% {
    transform: translateX(calc(110%)) rotate(-2deg);
  }
  80% {
    transform: translateX(calc(125%)) rotate(1deg);
  }
  90% {
    transform: translateX(calc(115%)) rotate(-1deg);
  }
  100% {
    transform: translateX(calc(120%)) rotate(0deg);
  }
}
</style>
