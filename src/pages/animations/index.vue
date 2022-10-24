<template>
  <div class="animations-content">
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
const context = require.context("./demos/", true, /\.vue$/);

const components = {};
const componentsList = [];

context.keys().forEach((key) => {
  const component = context(key).default;
  components[component.name] = component;
  componentsList.push({
    name: component.cnName || component.name,
    component,
    key: component.name,
    index: component.name.replace("demo", "")
  });
});
export default {
  name: "Animations",
  components: components,
  data() {
    return {
      componentsList: componentsList.sort((a, b) => a.index - b.index),
      active: {
        key: componentsList[0]?.key || 0,
        component: componentsList[0]?.component || null
      }
    };
  },
  methods: {
    setActive({ key, component }) {
      console.log(key, component);
      this.active.key = key;
      this.active.component = component;
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
