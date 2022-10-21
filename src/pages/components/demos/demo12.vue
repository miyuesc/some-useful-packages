<template>
  <div class="demo12">
    <weighted-line-bar v-for="(item, k) in bars" :key="k" v-bind="item" />
  </div>
</template>

<script>
import WeightedLineBar from "@/components/WeightedLineBar";
import { randomHexColor, randomRgbaColor } from "../../../../utils/colors";
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
      const barPadding = Math.floor(Math.random() * 8);
      const fontSize = Math.floor(Math.random() * 12 + 16);
      const barHeight = Math.floor(Math.random() * 16 + 16);
      return {
        title: `图表——${index}${index}${index}`,
        icon: `0${index}`,
        data: Math.random(),
        unit: "%%",
        color: [randomHexColor(), randomHexColor()],
        bgColor: randomRgbaColor(),
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
