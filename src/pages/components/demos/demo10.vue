<template>
  <div class="demo10">
    <div class="demos-content">
      <weighted-cylinder :data="0.67" title="权重" />
    </div>
    <div class="demos-content">
      <weighted-cylinder :data="0.82" title="占比" :show-data="false" />
    </div>
    <div class="demos-content">
      <weighted-cylinder :data="0.24" title="哈哈" reverse />
    </div>
    <div class="demos-content">
      <weighted-cylinder :data="0.14" title="哈哈">
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
  cnName: "圆柱数值图"
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
