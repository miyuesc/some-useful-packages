<template>
  <div class="json-editor" ref="editorEl"></div>
</template>

<script>
import JSONEditor from "jsoneditor";

export default {
  name: "JsonEditor",
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      this._editor = new JSONEditor(this.$refs.editorEl);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "jsoneditor/dist/jsoneditor.min.css";

.json-editor {
  min-height: 600px;
}
</style>
