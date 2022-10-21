<template>
  <div class="demo12">
    <weighted-line-bar v-for="(item, k) in bars" :key="k" v-bind="item" />
  </div>
</template>

<script>
import WeightedLineBar from "@/components/WeightedLineBar";
export default {
  name: "demo12",
  components: { WeightedLineBar },
  cnName: "横向条形图",
  data() {
    return {
      bars: []
    };
  },
  created() {
    this.bars = [1, 2, 3, 4, 5, 6].map((_, index) => {
      const barPadding = Math.floor(Math.random() * 6);
      const fontSize = Math.floor(Math.random() * 12 + 12);
      ``;
      const barHeight = Math.floor(Math.random() * 10 + 10);
      return {
        title: `图表——${index}${index}${index}`,
        icon: `0${index}`,
        data: Math.random(),
        unit: "%%",
        color: ["#18fef0", "#4bc5fe"],
        fontSize,
        barPadding,
        barHeight
      };
    });
    this.updateData();
  },
  methods: {
    updateData() {
      setTimeout(() => {
        this.bars.forEach((item) => {
          item.data = Math.random();
        });

        this.updateData();
      }, 1000);
    }
  }
};
</script>

<style scoped lang="scss">
.demo12 {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-row-gap: 20px;
  padding: 40px;
  width: 50vw;
  min-width: 240px;
  background-color: #010101;
}
</style>
