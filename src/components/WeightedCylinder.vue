<template>
  <div class="weighted-cylinder">
    <div class="weighted-cylinder__header"></div>
    <div class="weighted-cylinder__content">
      <div class="cylinder__content-inner" :style="computedStyle">
        <div v-if="showData" class="cylinder__content-data">{{ computedData }}</div>
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
    max: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: "权重"
    },
    unit: {
      type: String,
      default: ""
    },
    format: {
      type: Function
    },
    showData: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showUnit: {
      type: Boolean,
      default: true
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedData() {
      let data = this.data;
      if (this.format && typeof this.format === "function") {
        data = this.format(data);
      }
      if (this.unit && this.showUnit) {
        data += this.unit;
      }
      return data;
    },
    computedStyle() {
      const style = { height: `${(this.data / this.max) * 100}%` };
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
  .weighted-cylinder__footer,
  .weighted-cylinder__luminous {
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
      z-index: -1;
      bottom: -20px;
      background: linear-gradient(to right, #6776f8, #4bc5fe);
    }
  }
  .weighted-cylinder__header {
    top: 0;
    z-index: 20;
    //box-shadow: 0 0 8px 0 #92e1fe;
    filter: drop-shadow(0 0 8px #92e1fe);
    &::before {
      //box-shadow: 0 0 8px 0 #92e1fe;
      filter: drop-shadow(0 0 8px #92e1fe);
    }
  }
  .weighted-cylinder__footer {
    bottom: 0;
    z-index: 2;
    //box-shadow: 0 0 16px 0 #4bc5fe;
    filter: drop-shadow(0 0 16px #4bc5fe);
    &::after {
      //box-shadow: 0 6px 8px 0 #4bc5fe;
      filter: drop-shadow(0 6px 8px #4bc5fe);
    }
  }
  .weighted-cylinder__content {
    top: 10%;
    bottom: 10%;
    z-index: 10;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(102, 200, 255, 0.4));
  }

  .weighted-cylinder__luminous {
    top: 10%;
    bottom: 10%;
    z-index: 11;
    pointer-events: none;
    &::before {
      content: "";
      position: absolute;
      width: 2%;
      min-width: 2px;
      height: 5%;
      min-height: 16px;
      border-radius: 2px;
      background: linear-gradient(to bottom, rgba(39, 111, 171, 0.8), rgba(102, 255, 232, 0.52));
    }
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

    transition: all ease-in-out 0.2s;
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
      z-index: 10;
      background: linear-gradient(to right, #53d3fa, #56d9f8);
    }
    &::after {
      bottom: -16px;
      z-index: 1;
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
