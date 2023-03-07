<template>
  <div class="components-content">
    <ul class="page-slider">
      <li
        v-for="item in menus"
        :key="item.key"
        :class="{ 'is-active': active.name === item.name }"
        @click="setActive(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="page-content">
      <transition name="slide-left">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { copsMenu } from "@/router";

export default {
  name: "App",
  data() {
    return {
      componentsList: copsMenu.sort((a, b) => a.index - b.index),
      menus: copsMenu,
      active: {
        name: copsMenu[0]?.name || 0
      },
      testArr: [{}],
      testObj: { a: "1" }
    };
  },
  mounted() {
    console.log(this);
    this.active.name = this.menus.find((item) => item.name === this.$route.name)?.name;
  },
  methods: {
    setActive(item) {
      this.active.name = item.name;
      this.$router.push(`/components/${item.path}`);
    }
  },
  watch: {
    testArr(val) {
      console.log("watch array", val);
    },
    "testArr.length"(val) {
      console.log("watch array length", val);
    },
    testObj(val) {
      console.log("watch object", val);
    },
    "testObj.a"(val) {
      console.log("watch object property", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.components-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 240px auto;
}
</style>
