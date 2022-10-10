<template>
  <div class="json-editor-container">
    <div class="json-editor" ref="editorEl"></div>
    <div v-if="preview" class="json-viewer" ref="viewerEl"></div>
  </div>
</template>

<script>
import JSONEditor from "jsoneditor";
import { debounce } from "jsoneditor/src/js/util";

export default {
  name: "JsonEditor",
  props: {
    mode: {
      type: String,
      default: "code",
      validator(val) {
        return ["tree", "view", "form", "code", "text"].includes(val);
      }
    },
    options: {
      type: Object,
      default: () => ({})
    },
    preview: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      this._editor = new JSONEditor(this.$refs.editorEl, {
        ...this.options,
        onChange: this.onChange,
        modes: ["tree", "view", "form", "code", "text"],
        mode: this.mode
      });
      if (this.preview) {
        this._viewer = new JSONEditor(this.$refs.viewerEl, {
          mode: "preview"
        });
      }
    },
    // 默认事件响应
    onChange: debounce(function () {
      const jsonString = this._editor.getText();
      this._editor && this.$emit("change", jsonString);
      this.preview && this._viewer && this._viewer.setText(jsonString);
    }, 200),

    // 默认 JSONEditor 的方法
    destroy() {
      this._editor && this._editor.destroy();
    },
    collapseAll() {
      this._editor && this._editor.collapseAll();
    },
    expandAll() {
      this._editor && this._editor.expandAll();
    },
    expand(options) {
      this._editor && this._editor.expand(options);
    },
    focus() {
      this._editor && this._editor.focus();
    },
    get() {
      this._editor && this._editor.get();
    },
    getMode() {
      this._editor && this._editor.getMode();
    },
    getName() {
      this._editor && this._editor.getName();
    },
    getNodesByRange(start, end) {
      this._editor && this._editor.getNodesByRange(start, end);
    },
    getSelection() {
      this._editor && this._editor.getSelection();
    },
    getText() {
      this._editor && this._editor.getText();
    },
    getTextSelection() {
      this._editor && this._editor.getTextSelection();
    },
    refresh() {
      this._editor && this._editor.refresh();
    },
    set(json) {
      this._editor && this._editor.set(json);
    },
    setMode(mode) {
      this._editor && this._editor.setMode(mode);
    },
    setName(name) {
      this._editor && this._editor.setName(name);
    },
    setSchema(schema, schemas) {
      this._editor && this._editor.setSchema(schema, schemas);
    },
    setSelection(start, end) {
      this._editor && this._editor.setSelection(start, end);
    },
    setText(jsonString) {
      this._editor && this._editor.setText(jsonString);
    },
    setTextSelection(start, end) {
      this._editor && this._editor.setTextSelection(start, end);
    },
    update(json) {
      this._editor && this._editor.update(json);
    },
    updateText(jsonString) {
      this._editor && this._editor.updateText(jsonString);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "jsoneditor/dist/jsoneditor.min.css";
.json-editor-container {
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  .json-editor,
  .json-viewer {
    flex: 1;
    height: 100%;
  }
}
</style>
