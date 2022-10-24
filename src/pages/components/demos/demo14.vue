<template>
  <image-comparison :images="images" />
</template>

<script>
import ImageComparison from "@/components/ImageComparison";
import yoyo from "@/assets/yoyo.jpg";
import debug from "@/assets/debug.jpg";

export default {
  name: "demo14",
  components: { ImageComparison },
  cnName: "图片对比",
  data() {
    return {
      images: [yoyo, debug]
    };
  }
};
</script>

<style scoped></style>
