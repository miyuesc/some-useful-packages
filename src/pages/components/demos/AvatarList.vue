<template>
  <div class="avatar-list">
    <div class="avatar-item" v-for="(item, k) in list" :key="item" :style="{ zIndex: k }">
      <img :src="item" alt="avatar" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AvatarList",
  cnName: "头像列表",
  data() {
    // 转 props
    return {
      list: [
        "https://p3-passport.byteimg.com/img/user-avatar/8378ae90f38c97148d85582b480fd3ad~100x100.awebp",
        "https://p3-passport.byteimg.com/img/user-avatar/7e4a7c01e7022917f7242419f19a6c03~100x100.awebp",
        "https://p3-passport.byteimg.com/img/user-avatar/e3a142ceef01d6d640ac417a16f127f6~100x100.awebp",
        "https://p3-passport.byteimg.com/img/user-avatar/c029201d4200fb0a93f5b9fbcebca34f~100x100.awebp"
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.avatar-list {
  position: relative;
  border-radius: 56px;
  border: 4px solid #999999;
  width: max-content;
  height: 112px;
  overflow: hidden;
  display: flex;
  padding: 12px;
  box-sizing: border-box;
  transition: all ease-in-out 0.2s;
  .avatar-item {
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 4px solid #ffffff;
    outline: 4px solid #2d8cf0;
    overflow: hidden;
    transition: all ease-in-out 0.2s;
    position: relative;
    img {
      max-width: 100%;
      max-height: 100%;
    }
    &:hover {
      transform: scale(1.05);
    }
    & + .avatar-item {
      margin-left: -48px;
    }
  }

  &:hover {
    .avatar-item + .avatar-item {
      margin-left: -12px;
    }
  }
}
</style>
