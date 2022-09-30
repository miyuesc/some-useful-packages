<template>
  <div class="q-formula-designer" v-click-outside="() => (isActive = false)">
    <div
        class="q-formula__editor"
        :class="{ 'is-focus': isActive && activeOperatorIndex === null, 'is-error': isError }"
        ref="formula-editor"
        @click.stop="handleEditExpression"
    >
      <template v-for="(op, opk) in designedExpression">
        <div
            class="q-formula__editor-cursor"
            :class="{ 'is-focus': isActive && activeOperatorIndex === opk }"
            :key="'cursor' + opk"
            @click.stop="activeOperatorIndex = opk"
        ></div>
        <div class="q-formula__operator" :key="'operator' + opk">
          <el-input v-if="op.key && op.key === 'string'" v-model="op.value" size="mini" clearable @focus="keyboardFocus = false" />
          <el-input-number v-else-if="op.key && op.key === 'number'" v-model="op.value" size="mini" clearable @focus="keyboardFocus = false" />
          <el-button v-else size="mini">{{op.label}}</el-button>
        </div>
      </template>
    </div>
    <div class="q-formula__previewer">
      <span class="q-formula__previewer-item" v-for="(t, k) in designedExpression" :key="k">{{ t.key && t.key !== "()" ? t.value : t.label }}</span>
    </div>
    <el-collapse-transition>
      <div class="q-formula__parameters" v-show="isActive">
        <!-- 对象指标列 -->
        <div class="q-parameters form-operators" v-if="parameterType === 'customParameters'">
          <div class="q-parameters__operator-label">{{ parameterTypeName }}</div>
          <div class="q-parameter__item" v-for="(qi, qk) in quotaList" :key="qk">
            <el-button size="mini" :title="qi.label" @click="increaseNewParameter(qi)">{{ qi.label }}</el-button>
          </div>
        </div>
        <!-- 表单项列 -->
        <div class="q-parameters form-operators" v-if="parameterType === 'formItem'">
          <div class="q-parameters__operator-label">表单项</div>
          <div class="q-parameter__item" v-for="(fi, fk) in formParameters" :key="fk">
            <el-button size="mini" :title="fi.label" @click="increaseNewParameter(fi)">{{ fi.label }}</el-button>
          </div>
        </div>
        <div class="q-parameters arithmetic-operators">
          <div class="q-parameters__operator-label">运算符</div>
          <div class="q-parameter__item" v-for="(ai, ak) in arithmeticOperators" :key="ak">
            <el-button size="mini" :title="ai.name" @click="increaseNewParameter(ai)">{{ ai.label }}</el-button>
          </div>
        </div>
        <div class="q-parameters logical-operators">
          <div class="q-parameters__operator-label">逻辑符</div>
          <div class="q-parameter__item" v-for="(li, lk) in logicalOperators" :key="lk">
            <el-button size="mini" :title="li.name" @click="increaseNewParameter(li)">{{ li.label }}</el-button>
          </div>
        </div>
        <div class="q-parameters special-operators">
          <div class="q-parameters__operator-label">特殊项</div>
          <div class="q-parameter__item" v-for="(si, sk) in specialOperators" :key="sk">
            <el-button size="mini" :title="si.name" @click="increaseNewParameter(si, true)">{{ si.label }}</el-button>
          </div>
        </div>
      </div>
    </el-collapse-transition>
    <div class="control-buttons" v-show="isActive && needCheck && !!checkActive">
      <el-button size="small" type="primary" :loading="onChecking" @click="checkFormulaCorrectness">规则校验</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormulaDesigner",
  props: {
    value: {
      type: String,
      default: ""
    },
    formParameters: {
      type: Array,
      default: () => []
    },
    selectedParameters: {
      type: Array,
      default: () => []
    },
    parameterType: {
      type: String,
      default: "formItem"
    },
    parameterTypeName: {
      type: String,
      default: "对象指标"
    },
    quotaList: {
      type: Array,
      default: () => []
    },
    needCheck: {
      type: Boolean,
      default: false
    },
    checkActive: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      isActive: false,
      isError: false,
      activeOperatorIndex: null, // or number
      keyboardFocus: false,
      arithmeticOperators: [
        {
          label: "+",
          value: "+",
          name: "加"
        },
        {
          label: "-",
          value: "-",
          name: "减"
        },
        {
          label: "x",
          value: "*",
          name: "乘"
        },
        {
          label: "÷",
          value: "/",
          name: "除"
        },
        {
          label: "%",
          value: "%",
          name: "余"
        }
      ],
      logicalOperators:[
        {
          label: "且",
          value: "&&",
          name: "且"
        },
        {
          label: "或",
          value: "||",
          name: "或"
        },
        {
          label: "非",
          value: "!",
          name: "非"
        },
        {
          label: ">",
          value: ">",
          name: "大于"
        },
        {
          label: "<",
          value: "<",
          name: "小于"
        },
        {
          label: ">=",
          value: ">=",
          name: "大于或等于"
        },
        {
          label: "<=",
          value: "<=",
          name: "小于或等于"
        },
        {
          label: "=",
          value: "==",
          name: "等于"
        },
        {
          label: "!=",
          value: "!=",
          name: "不等于"
        }
      ],
      specialOperators: [
        {
          label: "(  )",
          value: ["(", ")"],
          name: "小括号",
          key: "()"
        },
        {
          label: "[ ]",
          value: ["[", "]"],
          name: "中括号",
          key: "[]"
        },
        {
          label: "{  }",
          value: ["{", "}"],
          name: "大括号",
          key: "{}"
        },
        {
          label: "文本",
          value: "",
          name: "文本",
          key: "string"
        },
        {
          label: "数值",
          value: 0,
          name: "数值",
          key: "number"
        },
        {
          label: "缺省",
          value: "_default",
          name: "缺省"
        }
      ],
      designedExpression: [],
      onChecking: false
    }
  },
  computed: {
    expressionValue() {
      if (!this.designedExpression.length) return "";

      if (this.parameterType === "formItem") {
        return "${" + `${this.designedExpression.map((o) => (o.key === "string" ? '"' + o.value + '"' : o.value)).join(" ")}` + "}";
      }

      return `${this.designedExpression.map((o) => o.value).join(" ")}`;
    },
    expressionPreview() {
      return this.designedExpression.map((t) => (t.key && t.key !== "()" ? t.value : t.label)).join(" ");
    },
    reactKeydownEvent() {
      return this.keyboardFocus;
    },
  },
  methods: {
    // 失去焦点
    handleBlurRuleInput() {
      // this.keyboardFocus = false;
    },
    // 键盘快捷键
    handleKeydown(e) {
      if (!this.reactKeydownEvent) return;
      if (document.activeElement !== document.body) return;
      switch (e.code.toLocaleLowerCase()) {
        case "backspace":
          this.handleDeleteOperator();
          break;
        case "arrowleft":
          this.handleMoveCursor(false);
          break;
        case "arrowright":
          this.handleMoveCursor(true);
          break;
      }
    },
    // 光标移动
    handleMoveCursor(arrow) {
      if (arrow) {
        if (this.activeOperatorIndex !== null && this.activeOperatorIndex < this.designedExpression.length - 1) {
          this.activeOperatorIndex++;
        } else if (this.activeOperatorIndex === this.designedExpression.length - 1) {
          this.activeOperatorIndex = null;
        }
      } else {
        if (this.activeOperatorIndex === null) {
          this.activeOperatorIndex = this.designedExpression.length - 1;
        } else if (this.activeOperatorIndex > 0) {
          this.activeOperatorIndex--;
        }
      }
    },
    // 移除某个元素
    handleDeleteOperator() {
      if (!this.designedExpression || !this.designedExpression.length) {
        return;
      } else {
        if (this.activeOperatorIndex === null) {
          this.designedExpression && this.designedExpression.pop();
        } else if (this.activeOperatorIndex > 0) {
          this.designedExpression.splice(this.activeOperatorIndex - 1, 1);
        }
        this.activeOperatorIndex !== null && this.activeOperatorIndex--;
      }
    },
    // 编辑框整体获得焦点
    handleEditExpression() {
      if (this.parameterType === "customParameters" && !this.quotaList.length) {
        this.$emit("no-custom-parameters");
        this.$emit("no-quota"); // 保证旧文件正常
        // return;
      }
      this.isActive = true;
      this.activeOperatorIndex = null;
      this.keyboardFocus = true;
    },
    // 表达式括号匹配验证
    expressionValidator(expression) {
      let string = expression;
      // eslint-disable-next-line no-useless-escape
      string = string.replace(/[^\(\)\[\]\{\}]/g, "");
      while (/\(\)|\[\]|\{\}/.test(string)) {
        string = string.replace(/\(\)|\[\]|\{\}/g, "");
      }
      return string === "";
    },
    // 表达式括号匹配验证
    emptyParameterValidator() {
      return this.designedExpression.map((ex) => ex.value).every((value) => !!value);
    },
    // 插入表达式单元
    increaseNewParameter(parameter, special = false) {
      let index = this.activeOperatorIndex === null ? this.designedExpression.length : this.activeOperatorIndex;
      const parameterSelf = JSON.parse(JSON.stringify(parameter));
      if (special) {
        // 特殊项
        // 括号
        if (['()', '[]', '{}'].includes(parameterSelf.key)) {
          let p = parameterSelf.value;
          this.designedExpression.splice(index, 0, { label: p[0], value: p[0], name: p[0] });
          this.designedExpression.splice(index + 1, 0, { label: p[1], value: p[1], name: p[1] });
          this.activeOperatorIndex = index + 1;
          return;
        }
        // 文本
        // 数值
        this.designedExpression.splice(index, 0, parameterSelf);
      } else {
        this.designedExpression.splice(index, 0, parameterSelf);
      }
      // 光标移动
      if (this.activeOperatorIndex !== null) this.activeOperatorIndex++;
    },
    saveFormulaExpression() {
      let validate = this.expressionValidator(this.expressionValue);
      if (!validate) this.$message.error("表达式校验失败");
    },
    async checkFormulaCorrectness() {
      try {
        this.onChecking = true;
        setTimeout(() => {
          this.onChecking = false;
        }, 1000)
      } catch (e) {
        this.onChecking = false;
      }
    },
    unusedEditing(e) {
      console.log(e);
      this.isActive = false;
      this.keyboardFocus = false;
    }
  },
  watch: {
    designedExpression: {
      immediate: true,
      deep: true,
      handler() {
        this.isError = !this.expressionValidator(this.expressionValue) && !this.emptyParameterValidator();
        this.$emit("change", this.expressionValue, this.designedExpression, this.expressionPreview);
        this.$emit("input", this.expressionValue);
      }
    },
    isActive: {
      immediate: true,
      handler(val) {
        if (val) {
          document.addEventListener("click", this.handleBlurRuleInput, true);
          document.addEventListener("keydown", this.handleKeydown);
        } else {
          document.removeEventListener("click", this.handleBlurRuleInput);
          document.removeEventListener("keydown", this.handleKeydown);
        }
      }
    },
    selectedParameters: {
      immediate: true,
      deep: true,
      handler(val) {
        this.isActive = false;
        console.log(val)
        if (val && val.length) {
          this.designedExpression = JSON.parse(JSON.stringify(this.selectedParameters));
        } else {
          this.designedExpression = [];
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.q-formula-designer {
  margin-top: 8px;
  display: grid;
  grid-template-rows: max-content max-content max-content max-content;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #eeeeee;
  width: 100%;
}
.q-formula__editor {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #eeeeee;
  min-height: 48px;
  display: flex;
  flex-wrap: wrap;
  line-height: 32px;
  position: relative;
  &:hover {
    cursor: text;
  }
  &.is-error:before {
    content: "表达式括号不匹配";
    color: #f56c6c;
    font-size: 12px;
    opacity: 0.8;
    position: absolute;
    bottom: 0;
  }
  .q-formula__editor-cursor {
    width: 8px;
    height: 26px;
    margin: 3px 0;
    &.is-focus:after {
      content: "";
      width: 2px;
      height: 26px;
      margin-left: 3px;
      display: inline-block;
      background: #999;
      animation: twinkle 1.4s infinite linear;
    }
    &:first-child {
      width: 0;
      &.is-focus:after {
        margin-left: -5px;
      }
    }
  }
  &.is-focus:after {
    content: "";
    width: 2px;
    height: 26px;
    margin: 3px;
    display: inline-block;
    background: #999;
    animation: twinkle 1.4s infinite linear;
  }
  .q-formula__operator {
    .el-input,
    .el-input-number {
      width: 100px;
    }
  }
}
.q-formula__previewer {
  min-height: 48px;
  padding: 8px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 32px;
  color: #333333;
  pointer-events: none;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  &:empty:before {
    content: "表达式预览";
    color: #cccccc;
  }
  .q-formula__previewer-item {
    pointer-events: auto;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
    & + .q-formula__previewer-item {
      margin-left: 8px;
    }
  }
}
.q-formula__parameters {
  display: inline-grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid #eeeeee;
  .q-parameters {
    border-right: 1px solid #eeeeee;
    width: 100%;
    overflow: hidden;
    &:last-child {
      border-right: none;
    }
    .q-parameters__operator-label {
      width: 100%;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      margin-bottom: 4px;
      color: #333333;
      text-align: center;
      border-bottom: 1px solid #eeeeee;
    }
    .el-button {
      margin: 4px;
      width: calc(100% - 8px);
      overflow: hidden;
      word-break: break-all;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.control-buttons {
  display: inline-flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 4px;
  border-top: 1px solid #eeeeee;
}

@keyframes twinkle {
  from {
    opacity: 1;
  }
  30% {
    opacity: 0;
  }
  70% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
