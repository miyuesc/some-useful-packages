<template>
  <div class="weighted-cylinder">
    <div class="weighted-cylinder__header"></div>
    <div class="weighted-cylinder__content">
      <div class="cylinder__content-inner" :style="computedStyle">
        <div v-if="showData" class="cylinder__content-data">{{ data }}</div>
        <div v-if="showTitle" class="cylinder__content-title">{{ title }}</div>
        <slot></slot>
      </div>
    </div>
    <div class="weighted-cylinder__footer"></div>
  </div>
</template>

<script>
export default {
  name: "WeightedCylinder",
  props: {
    data: {
      type: Number,
      default: 0.2
    },
    title: {
      type: String,
      default: "权重"
    },
    showData: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedStyle() {
      const style = { height: `${this.data * 100}%` };
      if (this.reverse) {
        style.flexDirection = "column-reverse";
      }
      return style;
    }
  }
};
</script>

<style scoped lang="scss">
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

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  .cylinder__content-data,
  .cylinder__content-title {
    z-index: 100;
  }
  .cylinder__content-data {
    font-size: 20px;
    font-weight: bold;
  }
  .cylinder__content-title {
    font-size: 16px;
  }
}
</style>
