<template>
  <div class="demo-page">
    <number-roll :value="number" />
  </div>
</template>

<script>
import NumberRoll from "@/components/NumberRoll.vue";
import th from "element-ui/src/locale/lang/th";

export default {
  name: "demo17",
  components: { NumberRoll },
  cnName: "数字滚动动画",
  data() {
    return {
      number: 0
    };
  },
  mounted() {
    const setData = () => {
      this.timer = setTimeout(() => {
        this.number += Math.floor(Math.random() * 200);
        setData();
      }, 2000);
    };
    setData();
    this.$once("hook:beforeDestroy", () => {
      clearTimeout(this.timer);
    });
  }
};
</script>
