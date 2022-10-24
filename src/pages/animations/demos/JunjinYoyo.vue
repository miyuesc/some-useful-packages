<template>
  <div class="main-content">
    <div class="juejin-yoyo">
      <div class="base"></div>
    </div>

    <div class="yoyo-image"></div>
  </div>
</template>

<script>
export default {
  name: "JunjinYoyo"
};
</script>

<style scoped lang="scss">
.main-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  .yoyo-image {
    background-image: url("../../../assets/yoyo.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .juejin-yoyo {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #0b1133, #081362 80%, #247a4b);
    backdrop-filter: blur(2px);
    perspective: 100px;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      left: -100%;
      right: -100%;
      bottom: 0;
      height: 46%;
      z-index: -1;
      background-image: linear-gradient(#37c71a 4px, transparent 0), linear-gradient(90deg, #37c71a 4px, transparent 0);
      background-size: 100px 42px;
      transform: rotateX(14deg);
    }
  }

  .base {
    width: 50%;
    height: 5%;
    position: absolute;
    bottom: 12%;
    left: 50%;
    transform: translateX(calc(-50% + 20px)) skewX(20deg);
    background-color: #f4edf5;
    //background: linear-gradient(#d6d5e7 50%, #f3f6ff 50%);
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background: linear-gradient(#d6d5e7 50%, #f3f6ff 50%);
    }
  }
}
</style>
