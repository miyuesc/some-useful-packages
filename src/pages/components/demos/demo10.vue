<template>
  <div class="demo10">
    <div class="demos-content">
      <weighted-cylinder :data="nums[0]" title="权重" />
    </div>
    <div class="demos-content">
      <weighted-cylinder :data="nums[1]" :format="(val) => (val * 100).toFixed(2)" title="占比" unit="%" />
    </div>
    <div class="demos-content">
      <weighted-cylinder :data="nums[2]" title="哈哈" reverse />
    </div>
    <div class="demos-content">
      <weighted-cylinder :data="nums[3]" title="哈哈">
        <div style="z-index: 10">这是 slot</div>
      </weighted-cylinder>
    </div>
  </div>
</template>

<script>
import WeightedCylinder from "@/components/WeightedCylinder";
export default {
  name: "demo10",
  components: { WeightedCylinder },
  cnName: "圆柱数值图",
  data() {
    return {
      nums: [0.67, 0.82, 0.24, 0.14]
    };
  },
  mounted() {
    this.updateData();
  },
  methods: {
    updateData() {
      this.nums = this.nums.map(() => +Math.random().toFixed(2));
      setTimeout(this.updateData, 1 * 1000);
    }
  }
};
</script>

<style scoped lang="scss">
.demo10 {
  display: flex;
  width: 100%;
  height: 100%;
}
.demos-content {
  margin: 100px auto;
  width: 100px;
  height: 240px;
}
</style>
