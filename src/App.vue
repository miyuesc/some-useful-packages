<template>
  <div id="app">
    <ul class="page-slider">
      <li
        v-for="item in componentsList"
        :key="item.key"
        :class="{ 'is-active': active.key === item.key }"
        @click="setActive(item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="page-content">
      <transition name="slide-left">
        <component :is="active.component" />
      </transition>
    </div>
  </div>
</template>

<script>
import Demo1 from "@/pages/demo1";
import Demo2 from "@/pages/demo2";
import Demo3 from "@/pages/demo3";
import Demo4 from "@/pages/demo4";
import Demo5 from "@/pages/demo5";
import Demo6 from "@/pages/demo6";
import Demo7 from "@/pages/demo7";

export default {
  name: "App",
  components: { Demo1, Demo2, Demo3 },
  data() {
    return {
      active: {
        key: 1,
        component: Demo1
      },
      componentsList: [
        { name: "地图线面编辑", component: Demo1, key: 1 },
        { name: "详情卡片", component: Demo2, key: 2 },
        { name: "公式编辑器", component: Demo3, key: 3 },
        { name: "圆环菜单", component: Demo4, key: 4 },
        { name: "BackdropFilter", component: Demo5, key: 5 },
        { name: "Splitting Demo 01", component: Demo6, key: 6 },
        { name: "JsonEditor", component: Demo7, key: 7 }
      ]
    };
  },
  methods: {
    setActive({ key, component }) {
      this.active.key = key;
      this.active.component = component;
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fff;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  display: grid;
  grid-template-columns: 240px auto;
}
.page-slider {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 12px;
  box-sizing: border-box;
  li {
    margin-bottom: 12px;
    line-height: 24px;
    font-size: 16px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all ease 0.2s;
    border-radius: 4px;
    &.is-active,
    &:hover {
      background-color: #2bc0e4;
      color: #010101;
    }
  }
}
.page-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  padding: 12px;
  &::before {
    content: "";
    position: absolute;
    top: 12px;
    left: 0;
    bottom: 12px;
    width: 1px;
    background-color: #d2d2d2;
  }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  width: 100%;
  transition: all 0.2s;
  position: absolute;
  z-index: 99;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
