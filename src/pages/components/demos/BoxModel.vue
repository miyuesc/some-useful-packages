<template>
  <div class="box-model">
    <div class="controller">
      <fieldset class="control-form base">
        <legend>BOX SIZING</legend>
        <el-radio-group v-model="boxSizing">
          <el-radio label="content-box" border>Content Box</el-radio>
          <el-radio label="border-box" border>Border Box</el-radio>
        </el-radio-group>
      </fieldset>
      <fieldset class="control-form base">
        <legend>DIMENSIONS</legend>
        <div class="control-item">
          <div class="control-item_label">WIDTH</div>
          <el-slider v-model="size.width" :min="0" :max="400" :step="1" />
          <span>{{ size.width }}px</span>
        </div>
        <div class="control-item">
          <div class="control-item_label">HEIGHT</div>
          <el-slider v-model="size.height" :min="0" :max="400" :step="1" />
          <span>{{ size.height }}px</span>
        </div>
      </fieldset>

      <fieldset v-for="t in ['margin', 'border', 'padding']" :class="`control-form ${t}`" :key="'form-' + t">
        <legend>{{ t.toUpperCase() }}</legend>
        <div class="control-item" v-for="m in ['top', 'right', 'bottom', 'left']" :key="`${t}-f-${m}`">
          <div class="control-item_label">{{ `${t.toUpperCase()}-${m.toUpperCase()}` }}</div>
          <el-slider v-model="config[t][m]" :min="0" :max="100" :step="1" :show-tooltip="false" />
          <span>{{ config[t][m] }}px</span>
        </div>
      </fieldset>
    </div>
    <div class="display-area" :style="{ height: marginBoxStyles.height }">
      <div class="display-box margin-box" data-attr-name="Margin" :style="marginBoxStyles">
        <span
          v-for="m in ['top', 'right', 'bottom', 'left']"
          :class="`property property-margin property-${m}`"
          :key="`margin-${m}`"
          >{{ config.margin[m] }}</span
        >
      </div>
      <div class="display-box border-box" data-attr-name="Border" :style="borderBoxStyles">
        <span
          v-for="m in ['top', 'right', 'bottom', 'left']"
          :class="`property property-border property-${m}`"
          :key="`border-${m}`"
          >{{ config.border[m] }}</span
        >
      </div>
      <div class="display-box padding-box" data-attr-name="Padding" :style="paddingBoxStyles">
        <span
          v-for="m in ['top', 'right', 'bottom', 'left']"
          :class="`property property-padding property-${m}`"
          :key="`padding-${m}`"
          >{{ config.padding[m] }}</span
        >
      </div>
      <div class="display-box content-box" data-attr-name="Content" :style="contentBoxStyles">
        <span class="inner-property property-width">{{ contentSize.width || 0 }}</span>
        <span class="inner-property">x</span>
        <span class="inner-property property-height">{{ contentSize.height || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const defaultData = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
export default {
  name: "BoxModel",
  cnName: "盒模型",
  data() {
    return {
      size: {
        width: 200,
        height: 200
      },
      config: {
        border: { ...defaultData },
        margin: { ...defaultData },
        padding: { ...defaultData }
      },
      boxSizing: "content-box"
    };
  },
  computed: {
    contentSize() {
      if (this.boxSizing === "content-box") {
        return this.size;
      } else {
        const { width, height } = this.size;
        const { top: ptop, right: pright, bottom: pbottom, left: pleft } = this.config.padding;
        const { top: btop, right: bright, bottom: bbottom, left: bleft } = this.config.border;
        return {
          width: width - pleft - pright - bleft - bright,
          height: height - ptop - pbottom - btop - bbottom
        };
      }
    },
    marginBoxStyles() {
      const { margin, border, padding } = this.config;
      const width =
        margin.left + border.left + padding.left + this.contentSize.width + padding.right + border.right + margin.right;
      const height =
        margin.top +
        border.top +
        padding.top +
        this.contentSize.height +
        padding.bottom +
        border.bottom +
        margin.bottom;
      return {
        top: 0,
        left: 0,
        width: `${width}px`,
        height: `${height}px`
      };
    },
    borderBoxStyles() {
      const { margin, border, padding } = this.config;
      const top = margin.top;
      const left = margin.left;
      const width = border.left + padding.left + this.contentSize.width + padding.right + border.right;
      const height = border.top + padding.top + this.contentSize.height + padding.bottom + border.bottom;
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`
      };
    },
    paddingBoxStyles() {
      const { margin, border, padding } = this.config;
      const top = margin.top + border.top;
      const left = margin.left + border.left;
      const width = padding.left + this.contentSize.width + padding.right;
      const height = padding.top + this.contentSize.height + padding.bottom;
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`
      };
    },
    contentBoxStyles() {
      const { margin, border, padding } = this.config;
      const left = margin.left + border.left + padding.left + "px";
      const top = margin.top + border.top + padding.top + "px";
      return {
        top,
        left,
        width: `${this.contentSize.width}px`,
        height: `${this.contentSize.height}px`
      };
    }
  }
};
</script>

<style scoped lang="scss">
$color-margin: #de6a63;
$color-padding: #c5d936;
$color-content: #63bcf8;
$color-border: #f8cc63;
$color-second: #ffffff;
$color-light: #ffffff;
$color-box-sizing: #8adfe0;
$color-font: #1b2735;
$color-label: #808386;

.box-model {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  background-color: #242930;
  padding: 40px;
  box-sizing: border-box;
  .controller {
    font-family: "Open Sans", sans-serif;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .control-form {
      border: 1px solid #343434;
      padding: 12px 6px;
      color: $color-label;
      legend {
        font-size: 24px;
        font-weight: lighter;
      }
      & + .control-form {
        margin-top: 20px;
      }
    }
    .control-item {
      width: 100%;
      display: grid;
      grid-template-columns: 160px 1fr 100px;
      grid-gap: 12px;
      align-items: center;
    }
    .control-item_label {
      text-align: right;
    }
  }

  .display-area {
    position: relative;
    .inner-property,
    .property {
      font-size: 16px;
      color: $color-font;
    }
    &:hover {
      .display-box {
        background-color: $color-second;
        outline-color: #f6f6f6;
      }
      .property {
        font-size: 16px;
        opacity: 0;
      }
    }
  }
  .display-box {
    position: absolute;
    box-sizing: border-box;
    outline-width: 1px;
    outline-color: $color-light;
    clear: both;
    transition: all linear 0.2s;
    &::before {
      content: attr(data-attr-name);
      position: absolute;
      left: 20px;
      top: 0;
      line-height: 24px;
      font-size: 12px;
    }
  }
  .display-box.margin-box {
    z-index: 1;
    outline-style: dashed;
    background-color: $color-margin;
    &:hover {
      background-color: $color-margin;
      .property {
        opacity: 1;
      }
    }
  }
  .display-box.border-box {
    z-index: 2;
    outline-style: solid;
    background-color: $color-border;
    &:hover {
      background-color: $color-border;
      .property {
        opacity: 1;
      }
    }
  }
  .display-box.padding-box {
    z-index: 3;
    outline-style: dashed;
    background-color: $color-padding;
    &:hover {
      background-color: $color-padding;
      .property {
        opacity: 1;
      }
    }
  }
  .display-box.content-box {
    z-index: 4;
    outline-style: solid;
    background-color: $color-content;
    display: flex;
    align-items: center;
    justify-content: center;
    .inner-property + .inner-property {
      margin-left: 12px;
    }
    &:hover {
      background-color: $color-content;
    }
  }
  .property {
    position: absolute;
  }
  .property-top {
    top: 0;
  }
  .property-right {
    right: 0;
    top: 50%;
  }
  .property-bottom {
    bottom: 0;
    left: 50%;
  }
  .property-left {
    left: 0;
    top: 50%;
  }
  .property-top,
  .property-bottom {
    &.property-margin {
      left: 70%;
    }
    &.property-border {
      left: 50%;
    }
    &.property-padding {
      left: 30%;
    }
  }
  .property-right,
  .property-left {
    &.property-margin {
      top: 70%;
    }
    &.property-border {
      top: 50%;
    }
    &.property-padding {
      top: 30%;
    }
  }
}
</style>
