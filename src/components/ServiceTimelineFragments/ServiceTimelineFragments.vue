<template>
  <div class="timeline-fragments" :style="computedStyles">
    <service-timeline-fragments-item
      v-for="frag in fragments"
      :key="frag.id"
      :time-range="timeRange"
      :gap="gap"
      :level="0"
      :fragment="frag"
    />
  </div>
</template>

<script>
import ServiceTimelineFragmentsItem from "@/components/ServiceTimelineFragments/ServiceTimelineFragmentsItem.vue";

export default {
  name: "ServiceTimelineFragments",
  components: { ServiceTimelineFragmentsItem },
  props: {
    fragments: {
      type: Array,
      default: () => []
    },
    timeRange: {
      type: Array,
      default: () => []
    },
    gap: {
      type: Number,
      default: 24
    },
    leftWidth: {
      type: Number,
      default: 320
    }
  },
  computed: {
    computedStyles() {
      return {
        "--label-width": `${this.leftWidth}px`
      };
    }
  }
};
</script>

<style lang="scss">
.timeline-fragments {
  position: relative;
  padding-left: 24px;
  &::after {
    content: "";
    position: absolute;
    left: var(--label-width);
    top: 0;
    bottom: 0;
    width: 0;
    border-left: 1px solid #eeeeee;
  }
}
</style>
