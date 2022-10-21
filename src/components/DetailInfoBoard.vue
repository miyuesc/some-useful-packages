<script>
export default {
  name: "DetailInfoBoard",
  props: {
    details: {
      type: Object,
      default: () => ({})
    },
    padding: {
      type: [String, Array],
      default: "8px 16px"
    },
    sizes: {
      type: Object,
      default: () => ({ xs: 12, sm: 12, md: 12, lg: 8, xl: 6 })
    },
    prop: {
      type: Object,
      default: () => ({})
    },
    labelPrefix: {
      type: String,
      default: "："
    }
  },
  computed: {
    detailInfoList() {
      if (!this.details) return [];
      return Object.keys(this.prop).reduce((list, propKey, index) => {
        let label, value, render, hidden, onlyRender;
        if (typeof this.prop[propKey] === "string") {
          label = this.prop[propKey] + this.labelPrefix;
          value = (this.details[propKey] || "-").toString();
        } else {
          label = this.prop[propKey].label + this.labelPrefix;
          render = this.prop[propKey].render;
          hidden = this.prop[propKey].hidden;
          onlyRender = this.prop[propKey].onlyRender;
          const format = this.prop[propKey].format;
          value =
            format && typeof format === "function"
              ? (format(propKey, this.details[propKey]) || "-").toString()
              : (this.details[propKey] || "-").toString();
        }
        !hidden && list.push({ index, label, value, render, onlyRender });
        return list;
      }, []);
    },
    computedStyle() {
      const padding = this.padding;
      if (typeof this.padding === "object") return { padding: padding.join(" ") };
      return { padding };
    }
  },
  render(h) {
    return h("div", { class: "detail-info-board", style: this.computedStyle }, [
      h("el-row", { props: { gutter: 16 } }, [
        this.$scopedSlots.append && this.$scopedSlots.append(),
        this.detailInfoList.map((item) =>
          h(
            "el-col",
            {
              props: this.sizes,
              class: "info-item-content",
              key: item.index
            },
            item.onlyRender
              ? [h("div", { class: "info-content_label" }, item.label), item.render && item.render(h, item)]
              : [
                  h("div", { class: "info-content_label" }, item.label),
                  item.value.length < 32
                    ? h("div", { class: "info-content_value" }, item.value)
                    : h("el-tooltip", { props: { content: item.value } }, [
                        h("div", { class: "info-content_value" }, item.value)
                      ]),
                  item.render && item.render(h, item)
                ]
          )
        ),
        this.$scopedSlots.prepend && this.$scopedSlots.prepend()
      ])
    ]);
  }
};
</script>

<style>
.detail-info-board {
  box-sizing: border-box;
}
.info-item-content {
  font-size: 0.8rem;
  line-height: 32px;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.info-content_value {
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
