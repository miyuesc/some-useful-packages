<template>
  <div class="center-earth-box">
    <div class="center-earth-content">
      <div class="earth" :class="{ 'is-highlight': highlight }" :style="brightnessStyle" key="earth"></div>
      <div class="earth-layer" :style="brightnessStyle" v-if="showLayer" key="layer"></div>
      <div class="earth-base" :style="brightnessStyle" v-if="showBase" key="base"></div>
      <div class="earth-orbit" :style="brightnessStyle" v-if="showOrbit" key="orbit"></div>
      <div class="earth-all-orbit" :style="brightnessStyle" v-if="showAllOrbit" key="allOrbit"></div>
      <div class="earth-simple-orbit" :style="brightnessStyle" v-if="showSimpleOrbit" key="simpleOrbit"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CenterEarthBox",
  props: {
    showLayer: {
      type: Boolean,
      default: true
    },
    showOrbit: {
      type: Boolean,
      default: true
    },
    showSimpleOrbit: {
      type: Boolean,
      default: true
    },
    showAllOrbit: {
      type: Boolean,
      default: true
    },
    showBase: {
      type: Boolean,
      default: true
    },
    highlight: {
      type: Boolean,
      default: true
    },
    brightness: {
      type: Number,
      default: 1
    }
  },
  computed: {
    brightnessStyle() {
      return { filter: `brightness(${this.brightness})` };
    }
  }
};
</script>

<style scoped lang="scss">
.center-earth-box {
  width: 100%;
  height: 100%;
}
.center-earth-content {
  position: relative;
  width: 100%;
  padding-bottom: 89%;
  box-sizing: border-box;
  .earth,
  .earth-layer,
  .earth-base,
  .earth-orbit,
  .earth-all-orbit,
  .earth-simple-orbit {
    position: absolute;
    top: 40%;
    left: 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    pointer-events: none;
  }
  // 图片问题，底座、外圈球、内圈球图片大小一致，所以统一大小和定位
  .earth-layer {
    width: 100%;
    height: 100%;
  }
  .earth-base {
    z-index: 1;
    width: 100%;
    height: 100%;
    transform: translateX(-50%) translateY(-54%);
    background-image: url("../assets/底部.png");
  }
  .earth-layer {
    width: 85%;
    height: 85%;
    z-index: 2;
    transform: translateX(-51%) translateY(-46%);
    background-image: url("../assets/外圈球星.png");
  }
  .earth {
    z-index: 3;
    width: 100%;
    height: 100%;
    transform: translateX(-50%) translateY(-45%);
    background-image: url("../assets/中心球星.png");
    &.is-highlight {
      filter: brightness(1.2);
      background-image: url("../assets/中心球星-highlight.png");
    }
  }
  .earth-orbit {
    z-index: 4;
    width: 56%;
    height: 56%;
    transform: translateX(-54%) translateY(-54%);
    background-image: url("../assets/抛线2.png");
  }
  .earth-all-orbit {
    z-index: 4;
    width: 56%;
    height: 56%;
    transform: translateX(-54%) translateY(-54%);
    background-image: url("../assets/抛线.png");
  }
  .earth-simple-orbit {
    z-index: 4;
    width: 75%;
    height: 75%;
    transform: translateX(-50%) translateY(-60%);
    background-image: url("../assets/轨道.png");
  }
}
</style>
