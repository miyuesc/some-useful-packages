<template>
  <div class="animations-content">
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
import { animationMenu } from "@/router";

export default {
  name: "Animations",
  data() {
    return {
      componentsList: animationMenu.sort((a, b) => a.index - b.index),
      menus: animationMenu,
      active: {
        name: animationMenu[0]?.name || 0
      }
    };
  },
  mounted() {
    this.active.name = this.menus.find((item) => item.name === this.$route.name).name;
  },
  methods: {
    setActive(item) {
      this.active.name = item.name;
      this.$router.push(`/animations/${item.path}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.animations-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 240px auto;
}
</style>
