<template>
  <div class="animations-content">
    <splitting-image-cover />
  </div>
</template>

<script>
import SplittingImageCover from "@/pages/animations/demos/SplittingImageCover";
export default {
  name: "Animations",
  components: { SplittingImageCover }
};
</script>

<style lang="scss" scoped>
.animations-content {
  width: 100%;
  height: 100%;
}
</style>
