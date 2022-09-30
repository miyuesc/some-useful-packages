<template>
  <div id="app">
    <el-collapse>
      <el-collapse-item title="地图线面编辑" name="map-edit">
        <p>
          <el-switch
              v-model="type"
              size="small"
              active-text="区域"
              inactive-text="折线"
              active-value="polygon"
              inactive-value="line"
          />
          <el-button type="primary" size="small" @click="mapVisible = true">编辑</el-button>
        </p>
        <p>address: {{ address }}</p>
        <p>points: {{ points }}</p>
        <map-overlay-edit  v-model="overplay" :type="type" :visible.sync="mapVisible" /></el-collapse-item>
      <el-collapse-item title="详情卡片" name="detail-info">
        <detail-info-board :details="objectDetails" :prop="objectDetailProps" />
      </el-collapse-item>
      <el-collapse-item title="公式编辑器" name="formula-designer">
        <p>Expression: {{expression}}</p>
        <p>ExpressionString: {{expressionString}}</p>
        <p>ExpressionParameters: {{expressionParameters}}</p>
        <formula-designer
            :form-parameters="formParameters"
            :selected-parameters="selectionParameters"
            @change="updateFlowExpression"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

import MapOverlayEdit from "@/somponents/MapOverlayEdit";
import DetailInfoBoard from "@/somponents/DetailInfoBoard";
import FormulaDesigner from "@/somponents/FormulaDesigner";
export default {
  name: 'App',
  components: {FormulaDesigner, DetailInfoBoard, MapOverlayEdit},
  data () {
    return {
      mapVisible: false,
      type: "polygon",
      overplay: {},
      objectDetailProps: {
        productId: "产品ID",
        nodeType: { label: "节点类型" },
        protocolType: { label: "接入协议" },
        reserveProductNo: "接入产品ID",
        netWorkMethod: { label: "联网方式" },
        syncState: {
          label: "同步状态",
          hidden: false,
          render: (h) => h("el-button", { props: { type: "text", size: "mini", onClick: () => alert('click') } }, "同步")
        },
        connectType: { label: "连接方式" },
        prdCode: { label: "产品类别" },
        placeType: { label: "内外场类型" },
        cipher: "产品密钥",
        createDt: "创建时间",
        updateDt: "修改时间",
        description: "产品描述"
      },
      objectDetails: {
        "cmiotExistFlag": false,
        "syncToCmiot": false,
        "productId": "Pro20220900013",
        "reserveProductNo": "20220900013",
        "productName": "车道信息",
        "nodeType": 4,
        "netWorkMethod": 1,
        "protocolType": 1,
        "authenticationMethod": null,
        "deviceNum": 0,
        "description": null,
        "createDt": "2022-09-19 17:09:18",
        "prdCode": "1536",
        "connectType": 0,
        "picUrl": null,
        "placeType": null,
        "cipher": "96lcV0jvG2wsvD31azSFac743xLByx10eexOwj4k",
        "syncState": null,
        "updateDt": "2022-09-19 17:09:18",
        "otherFlag": true,
        "icon": null
      },
      expression: '',
      expressionString:'',
      expressionParameters: [],
      formParameters: [
        {label: "选项一", value: 'value1', key: 'no01'},
        {label: "选项二", value: 'value2', key: 'no02'},
        {label: "选项三", value: 'value3', key: 'no03'},
        {label: "选项四", value: 'value4', key: 'no04'},
      ]
    }
  },
  computed: {
    address() {
      return this.overplay.address || "暂未选择";
    },
    points() {
      if (!this.overplay.points || !this.overplay.points.length) return "暂未绘制区域";
      return this.overplay.points.map(point => `[${point.join(",")}]`).join(", ");
    },
    selectionParameters() {
      return [];
    }
  },
  methods: {
    updateFlowExpression(expression, parameters, expressionString) {
      this.expression = expression;
      this.expressionString = expressionString;
      this.expressionParameters = JSON.parse(JSON.stringify(parameters));
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fff;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
}
</style>
