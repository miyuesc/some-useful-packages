<template>
  <div class="demo-page">
    <div>
      <el-button @click="expandAll">展开全部</el-button>
      <el-button @click="collapseAll">收起全部</el-button>
      <el-button @click="expandAllChildren">展开全部子节点</el-button>
      <el-button @click="collapseAllChildren">收起全部子节点</el-button>
      <el-button @click="expandAllDetails">展开全部详情</el-button>
      <el-button @click="collapseAllDetails">收起全部详情</el-button>
    </div>
    <div style="margin-top: 20px; width: 1200px">
      <service-timeline-fragments
        :fragments="data"
        :time-range="timeRange"
        ref="fragments"
        @details-expanded="nodeDetailsExpanded"
        @details-collapsed="nodeDetailsCollapsed"
        @children-expanded="nodeChildrenExpanded"
        @children-collapsed="nodeChildrenCollapsed"
      />
    </div>
  </div>
</template>

<script>
import ServiceTimelineFragments from "@/components/ServiceTimelineFragments/ServiceTimelineFragments.vue";
import { randomHexColor } from "../../../../utils/colors";

export default {
  name: "demo18",
  components: { ServiceTimelineFragments },
  cnName: "服务时间线",
  data() {
    return {
      timeRange: [0, 1820],
      colors: [
        "#A239FB",
        "#6325DF",
        "#5752FA",
        "#306FFC",
        "#038FF5",
        "#25ABE6",
        "#02D8FF",
        "#0eebeb",
        "#1DFFEE",
        "#08F4BD",
        "#12DBbE",
        "#13C565",
        "#1EDD51",
        "#A2E430",
        "#FFE922",
        "#FFC600"
      ],
      data: [
        {
          id: "1",
          label: "Service1",
          address: "https://127.0.0.1",
          times: [0, 1820],
          tags: ["tag1", "tag2", "tag3"],
          process: [{ label: "label1", value: "value 1111111" }],
          children: [
            {
              id: "1-1",
              label: "Service1-1",
              address: "https://127.0.0.11",
              times: [100, 1500],
              tags: ["tag4", "tag5", "tag6"],
              process: [{ label: "label1-1", value: "value 1111111-1" }],
              children: [
                {
                  id: "1-1-1",
                  label: "Service1-1-1",
                  address: "https://127.0.0.111",
                  times: [200, 1200],
                  tags: ["tag7", "tag8", "tag9"],
                  process: [{ label: "label1-1-1", value: "value 1111111-1-1" }],
                  children: [
                    {
                      id: "1-1-1-1",
                      label: "Service1-1-1-1",
                      address: "https://127.0.0.111",
                      error: true,
                      times: [500, 900],
                      tags: ["tag7", "tag8", "tag9"],
                      process: [{ label: "label1-1-1", value: "value 1111111-1-1" }]
                    }
                  ]
                },
                {
                  id: "1-1-2",
                  label: "Service1-1-2",
                  address: "https://127.0.0.112",
                  times: [200, 1000],
                  tags: ["tag10", "tag11", "tag12"],
                  process: [{ label: "label1-1-2", value: "value 1111111-1-2" }]
                }
              ]
            }
          ]
        },
        {
          id: "2",
          label: "Service2",
          address: "https://127.0.0.2",
          times: [0, 1820],
          tags: ["tag13", "tag14", "tag15"],
          process: [{ label: "label2", value: "value 2222222" }],
          children: [
            {
              id: "2-1",
              label: "Service2-1",
              address: "https://127.0.0.21",
              times: [600, 1600],
              error: true,
              tags: ["tag16", "tag17", "tag18"],
              process: [{ label: "label2-1", value: "value 2222222-1" }],
              children: [
                {
                  id: "2-1-1",
                  label: "Service2-1-1",
                  address: "https://127.0.0.211",
                  times: [800, 1150],
                  error: true,
                  tags: ["tag19", "tag20", "tag21"],
                  process: [{ label: "label2-1-1", value: "value 2222222-1-1" }]
                },
                {
                  id: "2-1-2",
                  label: "Service2-1-2",
                  address: "https://127.0.0.212",
                  times: [800, 950],
                  tags: ["tag22", "tag23", "tag24"],
                  process: [{ label: "label2-1-2", value: "value 2222222-1-2" }]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    expandAll() {
      this.$refs.fragments.expandAll();
    },
    collapseAll() {
      this.$refs.fragments.collapseAll();
    },
    expandAllChildren() {
      this.$refs.fragments.expandAllChildren();
    },
    collapseAllChildren() {
      this.$refs.fragments.collapseAllChildren();
    },
    expandAllDetails() {
      this.$refs.fragments.expandAllDetails();
    },
    collapseAllDetails() {
      this.$refs.fragments.collapseAllDetails();
    },

    nodeDetailsExpanded(data, node) {
      console.log("nodeDetailsExpanded", data, node);
    },
    nodeDetailsCollapsed(data, node) {
      console.log("nodeDetailsCollapsed", data, node);
    },
    nodeChildrenExpanded(data, node) {
      console.log("nodeChildrenExpanded", data, node);
    },
    nodeChildrenCollapsed(data, node) {
      console.log("nodeChildrenCollapsed", data, node);
    }
  }
};
</script>
