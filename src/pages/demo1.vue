<template>
  <div class="demo-page">
    <p>
      <el-switch
        v-model="type"
        size="small"
        active-text="区域"
        inactive-text="折线"
        active-value="polygon"
        inactive-value="line"
      />
      <el-button type="primary" size="mini" style="margin-left: 20px" @click="mapVisible = true">编辑</el-button>
    </p>
    <p>address: {{ address }}</p>
    <p>points: {{ points }}</p>
    <map-overlay-edit v-model="overplay" :type="type" :visible.sync="mapVisible" />
  </div>
</template>

<script>
import MapOverlayEdit from "@/somponents/MapOverlayEdit";

export default {
  name: "demo1",
  components: { MapOverlayEdit },
  data() {
    return {
      mapVisible: false,
      type: "polygon",
      overplay: {}
    };
  },
  computed: {
    address() {
      return this.overplay.address || "暂未选择";
    },
    points() {
      if (!this.overplay.points || !this.overplay.points.length) return "暂未绘制区域";
      return this.overplay.points.map((point) => `[${point.join(",")}]`).join(", ");
    }
  }
};
</script>
