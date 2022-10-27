<template>
  <div class="AnimationCards">
    <p>
      <el-button @click="resetData(0)">列表</el-button>
      <el-button @click="resetData(1)">乱序扇形</el-button>
      <el-button @click="resetData(2)">正序扇形</el-button>
    </p>

    <div class="demo-content">
      <div class="animation-cards-box">
        <div
          v-for="(styles, index) in cards"
          :class="['animation-card', { 'is-active': activeIndex === index, 'is-clutter': !!style, 'is-list': !style }]"
          :key="index"
          :style="styles"
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
      style: 0, // 杂乱
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
      if (document.activeElement !== document.body) return;
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
    resetData(s) {
      this.style = s;
      this.initData();
    },
    computedStyle(index, length) {
      const style = this.style;
      const defaultStyles = {
        "--max-index": length + 1,
        "--bg-color": randomRgbColor(),
        "--card-index": index
      };

      const tangle = 48;
      const unitArc = tangle / length;

      if (style === 0) {
        defaultStyles["left"] = `${16 * ++index}px`;
      } else if (style === 1) {
        let rotate = 0;
        if (index % 2 === 1) {
          rotate = length - index;
        } else {
          rotate = index - length;
        }
        defaultStyles["--rotate-deg"] = rotate + "deg";
      } else {
        let rotate = unitArc * index - 48 / 2;
        defaultStyles["--rotate-deg"] = rotate + "deg";
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
  position: relative;
  perspective: 1000px;
  .animation-card {
    width: 200px;
    background-color: var(--bg-color);
    border-radius: 8px;
    cursor: pointer;
    position: absolute;
    top: 20px;
    bottom: 20px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    z-index: var(--card-index);
    transition: all ease-in-out 0.4s;

    &.is-list {
      animation: reject ease-in-out 0.4s;
      &:hover {
        & ~ .animation-card {
          transform: translateX(36px);
        }
      }
      &.is-active {
        z-index: var(--max-index);
        animation: eject ease-in-out 0.8s;
        transform: translateX(calc(var(--max-index) * 20px - var(--card-index) * 20px - 40px));
      }
    }

    &.is-clutter {
      transform: translateX(0%) rotate(var(--rotate-deg));
      transform-origin: bottom center;
      &.is-active {
        animation: rotation ease-in-out 0.8s;
        transform: translateX(calc(220%)) rotate(0deg);
        z-index: var(--max-index);
      }
    }
  }
}

@keyframes eject {
  50% {
    z-index: var(--card-index);
    transform: translateX(calc(-100% - 20px)) rotateY(-120deg);
  }
  51% {
    z-index: var(--max-index);
  }
}
@keyframes reject {
  50% {
    z-index: var(--max-index);
    transform: translateX(calc(100% + 20px)) rotate(10deg);
  }
  51% {
    z-index: var(--card-index);
    transform: translateX(calc(100% + 20px)) rotate(10deg);
  }
}

@keyframes rotation {
  0% {
    transform: translateX(0%) rotate(var(--rotate-deg));
  }
  60% {
    z-index: var(--card-index) !important;
    transform: translateX(calc(230%)) rotate(2deg);
  }
  70% {
    transform: translateX(calc(210%)) rotate(-2deg);
  }
  80% {
    z-index: var(--max-index) !important;
    transform: translateX(calc(225%)) rotate(1deg);
  }
  90% {
    transform: translateX(calc(215%)) rotate(-1deg);
  }
  100% {
    transform: translateX(calc(220%)) rotate(0deg);
  }
}
</style>
