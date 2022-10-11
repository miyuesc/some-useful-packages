<template>
  <div class="demo-page">
    <p>Expression: {{ expression }}</p>
    <p>ExpressionString: {{ expressionString }}</p>
    <p>ExpressionParameters: {{ expressionParameters }}</p>
    <formula-designer :form-parameters="formParameters" @change="updateFlowExpression" />
  </div>
</template>

<script>
import FormulaDesigner from "@/components/FormulaDesigner";
export default {
  name: "demo3",
  components: { FormulaDesigner },
  data() {
    return {
      expression: "",
      expressionString: "",
      expressionParameters: [],
      formParameters: [
        { label: "选项一", value: "value1", key: "no01" },
        { label: "选项二", value: "value2", key: "no02" },
        { label: "选项三", value: "value3", key: "no03" },
        { label: "选项四", value: "value4", key: "no04" }
      ]
    };
  },
  methods: {
    updateFlowExpression(expression, parameters, expressionString) {
      this.expression = expression;
      this.expressionString = expressionString;
      this.expressionParameters = JSON.parse(JSON.stringify(parameters));
    }
  }
};
</script>
