<template>
  <div class="circle-menu-button" v-click-outside="() => (isActive = false)">
    <nav :class="{ menu: true, active: isActive }">
      <label class="menu-dots" for="menu" @click="isActive = !isActive">
        <span class="menu-dot"></span>
        <span class="menu-dot"></span>
        <span class="menu-dot"></span>
      </label>
      <ul class="menu-items">
        <li v-for="(m, k) in menus" class="menu-item" :style="iconStyle(k)" :key="m.name">
          <i :class="m.icon" />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "CircleMenuButton",
  data() {
    return {
      menus: [
        { icon: "el-icon-question", name: "1" },
        { icon: "el-icon-platform-eleme", name: "2" },
        { icon: "el-icon-camera-solid", name: "3" },
        { icon: "el-icon-info", name: "4" },
        { icon: "el-icon-s-shop", name: "5" },
        { icon: "el-icon-message-solid", name: "6" }
      ],
      isActive: false
    };
  },
  computed: {
    iconStyle() {
      const length = this.menus.length;
      return (i) => {
        return { transform: `rotate(${Math.floor((i * 360) / length)}deg)`, transitionDelay: `${0.05 * i}s` };
      };
    }
  }
};
</script>

<style scoped lang="scss">
.circle-menu-button {
  width: 100%;
  padding: 200px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to left, #2bc0e4, #eaecc6);
}
.menu {
  position: relative;
}

.menu-dots {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  box-shadow: 0 0 0 0.3rem #161e3f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotate(90deg);
  transition: 0.3s;
  cursor: pointer;
}
.menu-dots:hover {
  box-shadow: 0 0 0 0.3rem #161e3f, 0 0 0 1rem rgba(#161e3f, 0.16);
  transform: scale(1.2) rotate(90deg);
}
.menu-dot {
  width: 0.45rem;
  height: 0.45rem;
  background-color: #161e3f;
  border-radius: 50%;
}
.menu-dot + .menu-dot {
  margin-top: 0.3rem;
}
.menu.active > .menu-dots {
  transform: none;
  box-shadow: 0 0 0 3.4rem #161e3f;
}

.menu-items,
.menu-item {
  position: absolute;
  top: -3.4rem;
  left: -3.4rem;
  right: -3.4rem;
  bottom: -3.4rem;
  transition: 0.3s;
  pointer-events: none;
}
.menu-items {
  opacity: 0;
  color: #ffffff;
}
.menu.active .menu-items {
  opacity: 1;
}
.menu-item {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.9rem;
  font-size: 1.6rem;
  filter: blur(2px);
  opacity: 0;
  display: inline-block;
  text-align: center;
  i {
    pointer-events: auto;
    display: inline-block;
    cursor: pointer;
  }
  &:hover {
    color: #5c67ff;
  }
}

.menu.active .menu-items > .menu-item {
  opacity: 1;
  transform: none;
  filter: none;
}
</style>
