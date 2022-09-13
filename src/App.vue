<template>
  <div id="app">
    <div>
      <p>
        <el-switch
            v-model="type"
            size="small"
            active-text="区域"
            inactive-text="折线"
            active-value="polygon"
            inactive-value="line"
        />
      </p>
      <p>
        <el-button type="primary" size="small" @click="mapVisible = true">编辑</el-button>
      </p>
      <p>address: {{ address }}</p>
      <p>points: {{ points }}</p>
    </div>
    <map-overlay-edit  v-model="overplay" :type="type" :visible.sync="mapVisible" />
  </div>
</template>

<script>

import MapOverlayEdit from "@/somponents/MapOverlayEdit";
export default {
  name: 'App',
  components: {MapOverlayEdit},
  data () {
    return {
      mapVisible: false,
      type: "polygon",
      overplay: {},
    }
  },
  computed: {
    address() {
      return this.overplay.address || "暂未选择";
    },
    points() {
      if (!this.overplay.points || !this.overplay.points.length) return "暂未绘制区域";
      return this.overplay.points.map(point => `[${point.join(",")}]`).join(", ");
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #fff;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
}
</style>
