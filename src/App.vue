<template>
  <div id="app">
    <ul class="page-slider">
      <li v-for="item in componentsList" :key="item.name" @click="activeComponent = item.component">{{ item.name }}</li>
    </ul>
    <div class="page-content">
      <transition name="slide-left">
        <component :is="activeComponent" />
      </transition>
    </div>
  </div>
</template>

<script>
import Demo1 from "@/pages/demo1";
import Demo2 from "@/pages/demo2";
import Demo3 from "@/pages/demo3";

export default {
  name: "App",
  components: { Demo1, Demo2, Demo3 },
  data() {
    return {
      activeComponent: null,
      componentsList: [
        { name: "地图线面编辑", component: Demo1 },
        { name: "详情卡片", component: Demo2 },
        { name: "公式编辑器", component: Demo3 }
      ]
    };
  }
};
</script>

<style lang="scss">
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
  padding: 0 12px;
  li {
    margin-bottom: 12px;
    line-height: 24px;
    font-size: 20px;
    cursor: pointer;
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
    top: 0;
    left: 0;
    bottom: 0;
    width: 1px;
    background-color: #d2d2d2;
  }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.2s;
  width: 100%;
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
