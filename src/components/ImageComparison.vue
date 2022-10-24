<template>
  <div class="image-comparison" ref="box">
    <div class="cover-image" ref="coverImage">
      <img :src="images[0]" alt="" />
    </div>
    <div class="slider" ref="slider" @mousedown="startChange" @mouseup="endChange">
      <span class="tag-icon"></span>
    </div>
    <img class="base-image" :src="images[1]" alt="" />
  </div>
</template>

<script>
export default {
  name: "ImageComparison",
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      offsetX: 0
    };
  },
  methods: {
    startChange(event) {
      console.log(event);
      this.offsetX = event.pageX - this.$refs.slider.offsetLeft;
      window.addEventListener("mousemove", this.moveHandler);
      window.addEventListener("mouseup", this.endChange);
    },
    endChange() {
      window.removeEventListener("mousemove", this.moveHandler);
      window.removeEventListener("mouseup", this.endChange);
    },
    moveHandler(e) {
      this.$refs.slider.style.left = (e.pageX - this.offsetX - 4 || 0) + "px";
      this.$refs.coverImage.style.width = (e.pageX - this.offsetX || 0) + "px";

      // 此时 e.pageX 是鼠标滑动时据浏览器左边的距离，减去外部距离，
      // 即得到此时鼠标相对于图片区域的 X 坐标；
      // 让滑动条的 left 和左边图片宽度 都等于坐标，即可以达到跟随效果；
    }
  }
};
</script>

<style scoped lang="scss">
.image-comparison {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  * {
    user-select: none;
  }
  .slider {
    position: absolute;
    left: calc(50% - 4px);
    width: 8px;
    height: 100%;
    cursor: col-resize;
    z-index: 20;
    background: rgba(0, 0, 0, 0.5);
    .tag-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      border: 2px solid rgba(255, 255, 255, 0.5);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.5);
      transform: translate(-50%, -50%);
    }
  }
  .cover-image,
  .base-image {
    position: absolute;
    left: 0;
    height: 100%;
    overflow: hidden;
  }
  .cover-image {
    left: 0;
    width: 50%;
    z-index: 20;
  }
  img {
    max-height: 100%;
  }
}
</style>
