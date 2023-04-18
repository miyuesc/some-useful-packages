<template>
  <div class="demo-page">
    <div class="demo-center">
      <center-earth-box />
    </div>
  </div>
</template>

<script>
import CenterEarthBox from "@/components/CenterEarthBox.vue";

export default {
  name: "demo19",
  components: { CenterEarthBox }
};
</script>

<style scoped>
.demo-center {
  margin: 20px auto;
  width: 1000px;
  position: relative;
  overflow: hidden;
  background-color: #1b2735;
}
</style>
