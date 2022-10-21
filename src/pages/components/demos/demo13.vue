<template>
  <div class="demo13">
    <div class="buttons-box">
      <el-button size="mini" @click="openModel">查看xml</el-button>
      <el-button size="mini" @click="directUpdate">直接更新</el-button>
      <el-button size="mini" @click="dealUpdate">拷贝更新</el-button>
      <el-button size="mini" @click="getData">数据获取</el-button>
    </div>
    <div class="data-box">{{ this.testData }}</div>
    <div class="designer-box" ref="designer"></div>

    <el-dialog title="xml 数据" :visible.sync="modelVisible" width="72vw" append-to-body>
      <pre class="preview-content">
        {{ xml }}
      </pre>
    </el-dialog>
  </div>
</template>

<script>
import Modeler from "bpmn-js/lib/Modeler";
import CamundaBpmnModdle from "camunda-bpmn-moddle/resources/camunda.json";
import { createNewDiagram } from "../../../../utils/xml";

export default {
  name: "demo13",
  cnName: "BpmnDemo",
  data() {
    return {
      modelVisible: false,
      xml: "",
      testData: {
        data1: "data1",
        data2: "data2",
        name: "名称",
        value: "its value",
        obj: {},
        arr: [0, 1, 2],
        extensionElements: [{ a: "a1" }, { a: "a2" }]
      }
    };
  },
  mounted() {
    this._modeler = new Modeler({
      container: this.$refs.designer,
      moddleExtensions: {
        camunda: CamundaBpmnModdle
      }
    });
    createNewDiagram(this._modeler);
  },
  methods: {
    getElement() {
      const el = this._modeler.get("selection").get()[0];
      !el && this.$message.error("选择元素");
      return el;
    },
    async openModel() {
      const { xml } = await this._modeler.saveXML({ format: true, preamble: true });
      this.xml = xml;
      this.modelVisible = true;
    },
    directUpdate() {
      const el = this.getElement();
      el && this._modeler.get("modeling").updateProperties(el, this.testData);
      console.log(el.businessObject);
    },
    dealUpdate() {
      const el = this.getElement();
      el && this._modeler.get("modeling").updateProperties(el, JSON.parse(JSON.stringify(this.testData)));
      console.log(el.businessObject);
    },

    getData() {
      const el = this.getElement();
      if (el) {
        const ex = el.businessObject.get("extensionElements");
        console.log("extensionElements", ex);
        console.log(ex.get("values"));
      }
    }
  }
};
</script>

<style lang="scss">
@import "bpmn-js/dist/assets/diagram-js.css"; // 基础样式
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css"; // 节点基础图标
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css"; // 节点完整图标
.demo13 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.designer-box {
  width: 100%;
  overflow: hidden;
  flex: 1;
}
.preview-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  line-height: 24px;
  word-break: break-word;
  white-space: pre-wrap;
  overflow-x: hidden;
}
</style>
