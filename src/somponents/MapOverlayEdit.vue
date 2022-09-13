<template>
  <el-dialog
      title="实例范围选择"
      :close-on-click-modal="false"
      destroy-on-close
      append-to-body
      :visible="visible"
      width="1000px"
      @close="closeDialog"
  >
    <div class="edit-main-body">
      <div
          style="position: relative; width: 100%; height: 100%; grid-column: 1 / 3; grid-row: 1 / 3"
      >
        <div ref="map" class="q-overplay-edit_map"></div>
        <div class="edit-btns" v-if="!disabled">
          <el-button
              size="small"
              type="primary"
              v-if="overlayPath && overlayPath.length"
              @click="redrawOverlay"
          >重新绘制</el-button
          >
          <el-button size="small" type="primary" v-else @click="redrawOverlay">绘制</el-button>
        </div>
      </div>
      <div class="path-list">
        <div class="path-item">实例路径：</div>
        <div class="path-item" v-for="(i, k) in overlayPath" :key="k">
          <span class="path-index">{{ k + 1 }}</span>
          <el-input size="small" v-model="overlayPath[k]">
            <i
                v-if="!disabled"
                slot="suffix"
                class="el-input__icon el-icon-circle-close"
                @click="removeTurningPoint(k)"
            ></i>
          </el-input>
          <el-divider v-if="!disabled && k !== overlayPath.length - 1">
            <i
                class="el-icon-circle-plus-outline"
                title="添加拐点"
                @click="addTurningPoint(i, k)"
            ></i>
          </el-divider>
          <el-divider v-else />
        </div>
        <div class="path-item" style="justify-content: center" v-if="!disabled">
          <el-button size="small" type="primary" round @click="addLastTurningPoint"
          >添加拐点</el-button
          >
        </div>
      </div>
      <div class="dialog-control-btns">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button v-show="!disabled" size="small" type="primary" @click="submitDrawn"
        >确 定</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
import MapLoader from "@/utils/MapLoader";

export default {
  name: "MapOverlayEdit",
  props: {
    version: {
      type: String,
      default: "1.4.15"
    },
    uiVersion: {
      type: String,
      default: "1.1"
    },
    visible: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => null
    },
    type: {
      type: String,
      default: "polygon"
    },
    center: {
      type: Array,
      default: () => null
    }
  },
  data() {
    return {
      mouseTool: null,
      overlay: null,
      overlayPath: [],
      zoom: 14,
      mapCenter: this.center || [106.5691371, 29.6438141]
    };
  },
  methods: {
    // 载入地图
    async initMap(center) {
      if (!window.AMap) {
        await MapLoader();
      }
      if (!this.$refs.map) {
        return this.initMap(center)
      }
      this.map = new window.AMap.Map(this.$refs.map, {
        center: center,
        zoom: this.zoom,
        mapStyle: "amap://styles/light",
        features: ["bg", "road", "building"]
      });
      // 加载地图鼠标工具
      if (!window.AMap.MouseTool) {
        window.AMap.plugin("AMap.MouseTool");
      }
      // 修改鼠标样式( 十字型 )
      this.map.setDefaultCursor("crosshair");
    },

    // 加载多边形/折线
    async initOverlay() {
      if (this.overlay) this.map.clearMap();
      setTimeout(() => {
        if (this.type === "polygon" || this.type === "area") {
          this.overlay = new window.AMap.Polygon({
            path: this.overlayPath.map(o => o.split(",")),
            strokeColor: "#FF33FF",
            strokeWeight: 2,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            fillColor: "#1791fc",
            zIndex: 50
          });
        } else {
          this.overlay = new window.AMap.Polyline({
            path: this.overlayPath.map(o => o.split(",")),
            strokeColor: "#2d8cf0",
            strokeWeight: 4,
            zIndex: 50
          });
        }
        let markers = [];
        let dis = Math.floor(this.overlayPath.length / 4);
        if (dis > 2) {
          for (let i = 0; i < 5; i++) {
            let marker = new window.AMap.Marker({
              position:
                  i === 4
                      ? this.overlayPath[this.overlayPath.length - 1].split(",")
                      : this.overlayPath[i * dis].split(","),
              label: {
                offset: new window.AMap.Pixel(0, -8), //设置文本标注偏移量
                content: `<div class='q-overplay-edit_info'>${
                    i === 4 ? this.overlayPath.length : i * dis + 1
                }</div>`, //设置文本标注内容
                direction: "top" //设置文本标注方位
              }
            });
            markers.push(marker);
          }
        } else {
          this.overlayPath.forEach((i, k) => {
            if (k % 2 === 0) {
              let marker = new window.AMap.Marker({
                position: i.split(","),
                label: {
                  offset: new window.AMap.Pixel(0, -8), //设置文本标注偏移量
                  content: `<div class='q-overplay-edit_info'>${k + 1}</div>`, //设置文本标注内容
                  direction: "top" //设置文本标注方位
                }
              });
              markers.push(marker);
            }
          });
        }
        this.map.add([this.overlay, ...markers]);
        this.map.setFitView();
      }, 1);
    },

    // draw
    redrawOverlay() {
      if (this.map) this.map.clearMap();
      this.overlayPath = [];
      this.mouseTool = new window.AMap.MouseTool(this.map);
      if (this.type === "polygon" || this.type === "area") {
        this.mouseTool.polygon({
          fillColor: "#00b0ff",
          strokeColor: "#80d8ff"
        });
      } else {
        this.mouseTool.polyline({
          strokeWeight: 4,
          strokeColor: "#2d8cf0"
        });
      }
      this.mouseTool.on("draw", e => {
        this.overlayPath = e.obj.getPath().map(o => o.lng + "," + o.lat);
        this.mouseTool.close();
      });
    },

    addTurningPoint(i, k) {
      this.overlayPath.splice(k, 0, i);
    },

    addLastTurningPoint() {
      if (this.overlayPath && this.overlayPath.length) {
        this.overlayPath.splice(
            this.overlayPath.length - 1,
            0,
            this.overlayPath[this.overlayPath.length - 1]
        );
      } else {
        this.overlayPath.push(this.mapCenter.join(","));
      }
    },

    removeTurningPoint(k) {
      this.overlayPath.splice(k, 1);
    },

    closeDialog() {
      this.$emit("update:visible", false);
      this.overlayPath = [];
      this.overlay = null;
    },

    submitDrawn() {
      this.$prompt("请输入提示地址", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.value.address || "",
        inputPlaceholder: "请输入提示地址",
        inputErrorMessage: "提示地址不能为空",
        inputValidator: value => {
          return !!value;
        }
      }).then(({ value }) => {
        this.$emit("input", {
          ...this.value,
          points: this.overlayPath.map(o => o.split(",")),
          address: value
        });
        this.$emit("change", {
          ...this.value,
          points: this.overlayPath.map(o => o.split(",")),
          address: value
        });
        this.$emit("update:visible", false);
      });
    },

    clearMap() {
      if (this.map) this.map.clearMap();
    }
  },
  beforeDestroy() {
    if (this.map) this.map.destroy();
    this.overlayPath = [];
    this.overlay = null;
  },
  watch: {
    visible: {
      handler: function (newVal) {
        if (!newVal) return;
        this.$nextTick(async () => {
          if (this.value && this.value.points && this.value.points.length) {
            this.overlayPath = this.value.points.map(i => i.join(","));
            this.initMap(this.mapCenter).then(async () => this.initOverlay());
          } else {
            await this.initMap(this.mapCenter);
          }
        });
      },
      immediate: true
    },
    overlayPath: {
      handler: function () {
        if (this.map) {
          this.$nextTick(async () => await this.initOverlay());
        } else {
          this.$nextTick(async () => {
            await this.initMap(this.center);
            await this.initOverlay();
          });
        }
      },
      deep: true,
      immediate: false
    }
  }
};
</script>
<style scoped>
.edit-main-body {
  width: 100%;
  height: 600px;
  display: grid;
  grid-template-columns: auto 280px 280px;
  grid-template-rows: auto 32px;
}
.q-overplay-edit_map {
  position: absolute;
  width: 100%;
  height: 100%;
}
.edit-btns {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 999;
}
.path-list {
  box-sizing: border-box;
  padding: 0 4px 0 16px;
  overflow-y: auto;
  height: calc(100% - 8px);
}
.path-item {
  display: flex;
  /*height: 40px;*/
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
}
.path-item:first-child {
  font-size: 14px;
  height: 32px;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 2;
  margin-bottom: 8px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  border-bottom: 1px dashed #d2d2d2;
}
.path-item .path-index {
  display: inline-block;
  width: 32px;
  height: 32px;
  border: 1px solid #dddde2;
  border-radius: 50%;
  line-height: 32px;
  text-align: center;
}
.path-item .el-input {
  width: calc(100% - 40px);
}
.path-item .el-input i:hover {
  cursor: pointer;
  color: #2d8cf0;
}
.path-list::-webkit-scrollbar {
  width: 5px;
  height: 4px;
}
.path-list::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.6);
  background: #eaedf1;
}
.path-list::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0);
}
.dialog-control-btns {
  display: inline-flex;
  justify-content: flex-end;
}
.el-divider--horizontal {
  margin: 12px 0;
}
.amap-marker-label {
  background-color: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid #2d8cf0;
  box-shadow: 0 0 4px 4px rgba(45, 140, 240, 0.6);
}
.q-overplay-edit_info {
  position: relative;
  top: 0;
  right: 0;
  width: 24px;
  text-align: center;
}
.amap-logo {
  display: none !important;
}
</style>
