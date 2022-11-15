<template>
  <div class="demo-page">
    <div class="demo-content">
      <div class="around-box">
        <div class="center">center</div>

        <div
          :class="['star', { 'is-stop': activeIndex >= 0 }]"
          v-for="i in stars"
          :key="i"
          :style="{ '--star-index': i, '--ans-step': 36 / (stars.length - 1) }"
        >
          <div
            :class="['star-content', { 'is-active': activeIndex === i }]"
            @mouseover="hoverStar(i)"
            @mouseleave="leaveStar"
          >
            <div class="star-bg"></div>
            <div class="star-info">{{ i }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StarAround",
  data() {
    return {
      activeIndex: -1,
      stars: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      // stars: [1]
    };
  },
  methods: {
    hoverStar(i) {
      this.activeIndex = i;
    },
    leaveStar(i) {
      this.activeIndex = -1;
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
  filter: drop-shadow(0 0 2rem var(--glossy-red)) blur(1px);
}
.star {
  position: absolute;
  left: calc(50% - 223px);
  top: calc(50% - 223px);
  width: 446px;
  height: 446px;
  border-width: 2px;
  border-style: solid;
  border-color: var(--paths-theme);
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
  display: flex;
  width: 36px;
  height: 36px;

  animation: planets-rotation 36s linear infinite;
  animation-delay: calc(var(--ans-step) * var(--star-index) * -1s);

  border-width: 2px;
  border-style: solid;
  border-color: var(--planets-theme);
  border-radius: 50%;
  background: transparent;

  justify-content: center;
  align-items: center;
  pointer-events: auto;
}

@keyframes solar-revolution {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes planets-rotation {
  from {
    transform: rotate(360deg) skewX(60deg);
  }
  to {
    transform: rotate(0deg) skewX(60deg);
  }
}
</style>
