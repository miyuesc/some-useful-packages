<template>
  <div class="demo-page">
    <div class="demo-center">
      <center-star-around :stars="stars" :mini-stars="miniStars"></center-star-around>
    </div>
  </div>
</template>

<script>
import CenterStarAround from "@/components/CenterStarAround.vue";

export default {
  name: "demo20",
  components: { CenterStarAround },
  cnName: "3d环绕星球",
  data() {
    return {
      miniStars: [{ name: "miniStar1" }, { name: "miniStar2" }],
      stars: [
        { name: "star1" },
        { name: "star2" },
        { name: "star3" },
        { name: "star4" },
        { name: "star5" },
        { name: "star6" },
        { name: "star7" },
        { name: "star8" },
        { name: "star9" },
        { name: "star10" }
      ]
    };
  }
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
