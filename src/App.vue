<template>
  <div id="app">
    <header class="header">
      <router-link to="/components">Vue 组件</router-link>
      <router-link to="/animations">CSS 动画</router-link>
    </header>
    <section class="container">
      <router-view />
    </section>
  </div>
</template>

<script>
export default {
  name: "App"
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
  display: flex;
  flex-direction: column;
  .header {
    height: 48px;
    border-bottom: #d2d2d2;
    box-shadow: 0 0 4px 0 #d2d2d2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 8px 20px;
    a + a {
      margin-left: 20px;
    }
  }
  .container {
    flex: 1;
  }
}
</style>
