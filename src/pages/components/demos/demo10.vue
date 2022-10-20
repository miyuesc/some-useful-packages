<template>
  <div class="demo10">
    <div class="demos-content">
      <div class="weighted-cylinder">
        <div class="weighted-cylinder__header"></div>
        <div class="weighted-cylinder__content">
          <div class="cylinder__content-inner" :style="computedStyle"></div>
        </div>
        <div class="weighted-cylinder__footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo10",
  cnName: "圆柱数值图",
  props: {
    data: {
      type: Number,
      default: 0.2
    }
  },
  computed: {
    computedStyle() {
      return { height: `${this.data * 100}%` };
    }
  }
};
</script>

<style scoped lang="scss">
.demos-content {
  margin: 100px auto;
  width: 100px;
  height: 240px;
}

.weighted-cylinder {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 0;
  .weighted-cylinder__header,
  .weighted-cylinder__content,
  .weighted-cylinder__footer {
    position: absolute;
    left: 0;
    right: 0;
  }
  .weighted-cylinder__header,
  .weighted-cylinder__footer {
    height: 10%;
    background: linear-gradient(to right, #6776f8, #4bc5fe);
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 40px;
      border-radius: 50%;
    }
    &::before {
      z-index: 3;
      top: -20px;
      background: linear-gradient(to right, #66c8ff, #92e1fe);
    }
    &::after {
      z-index: 1;
      bottom: -20px;
      background: linear-gradient(to right, #6776f8, #4bc5fe);
    }
  }
  .weighted-cylinder__header {
    top: 0;
    z-index: 20;
  }
  .weighted-cylinder__footer {
    bottom: 0;
    z-index: 2;
  }
  .weighted-cylinder__content {
    top: 10%;
    bottom: 10%;
    z-index: 10;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(102, 200, 255, 0.2));
  }

  .cylinder__content-inner {
    position: absolute;
    left: 8%;
    right: 8%;
    bottom: 0;
    background: linear-gradient(to right, #12e49a, #2c86e1);
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 32px;
      border-radius: 50%;
    }
    &::before {
      top: -16px;
      background: linear-gradient(to right, #53d3fa, #56d9f8);
    }
    &::after {
      bottom: -16px;
      background: linear-gradient(to right, #12e49a, #2c86e1);
    }
  }
}
</style>
