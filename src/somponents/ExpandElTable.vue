<script>
import { Table } from "element-ui";
import { parseHeight } from "element-ui/packages/table/src/util";


// 支持 max-height 的 el-table
export default {
  name: "ExpandElTable",
  extends: Table,
  props: {
    maxHeight: {
      type: [String, Number],
      default: "100%"
    }
  },
  computed: {
    bodyHeight() {
      const { headerHeight = 0, bodyHeight, footerHeight = 0 } = this.layout;
      if (this.height) {
        return {
          height: bodyHeight ? bodyHeight + "px" : ""
        };
      } else if (this.maxHeight) {
        const maxHeight = parseHeight(this.maxHeight);
        if (typeof maxHeight === "number") {
          return {
            "max-height": maxHeight - footerHeight - (this.showHeader ? headerHeight : 0) + "px"
          };
        } else if (maxHeight.match(/\d+(%|vh)/g)) {
          return {
            "max-height": `calc(${maxHeight} - ${footerHeight + this.showHeader ? headerHeight : 0}px)`
          };
        }
      }
      return {};
    },
    fixedBodyHeight() {
      if (this.height) {
        return {
          height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + "px" : ""
        };
      } else if (this.maxHeight) {
        let maxHeight = parseHeight(this.maxHeight);
        console.log(maxHeight);
        if (typeof maxHeight === "number") {
          maxHeight = this.layout.scrollX ? maxHeight - this.layout.gutterWidth : maxHeight;
          if (this.showHeader) {
            maxHeight -= this.layout.headerHeight;
          }
          maxHeight -= this.layout.footerHeight;
          return {
            "max-height": maxHeight + "px"
          };
        } else if (maxHeight.match(/\d+(vh|%)/g)) {
          // let resHeight = this.layout.scrollX ? `100% - ${this.layout.gutterWidth}px` : "100%";
          let resHeight = "100%";
          if (this.showHeader) {
            resHeight = `${resHeight} - ${this.layout.headerHeight}px`;
          }
          resHeight = `${resHeight} - ${this.layout.footerHeight}px`;
          return {
            "max-height": `calc(${resHeight})`
          };
        }
      }
      return {};
    }
  }
};
</script>
<style scoped>
.el-table {
  display: flex;
  flex-direction: column;
}
.el-table >>> .el-table__header-wrapper {
  flex-shrink: 0;
}
.el-table >>> .el-table__body-wrapper {
  flex-grow: 1;
}
</style>
