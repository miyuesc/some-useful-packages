<template>
  <div class="demo11">
    <highlight-text text="这是高亮文本" size="24px" unit="unit" /><br />
    <highlight-text text="这是高亮文本2" size="32px" color="#ea28bc" unit="单位" /><br />
    <highlight-text text="这是高亮文本3" size="64px" color="#ea28bc" unit="%" :lighting="false" /><br />
  </div>
</template>

<script>
import HighlightText from "@/components/HighlightText";
export default {
  name: "demo11",
  components: { HighlightText },
  cnName: "高亮文本"
};
</script>

<style scoped></style>
