<template>
  <div class="demo11">
    <highlight-text text="这是高亮文本" size="24px" unit="unit" /><br />
    <highlight-text :text="8972183671.1762" size="32px" unit="%" /><br />
    <highlight-text text="这是高亮文本2" size="32px" color="#ea28bc" /><br />
    <highlight-text text="这是高亮文本3，没有单位" size="48px" color="#8b5fda" /><br />
    <highlight-text text="这是高亮文本4" size="64px" color="#ea28bc" unit="%" :lighting="false" /><br />
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
