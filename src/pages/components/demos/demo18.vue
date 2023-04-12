<template>
  <div class="demo-page">
    <service-timeline-fragments :fragments="data" :time-range="timeRange" />
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
      data: [
        {
          id: "1",
          label: "Service1",
          address: "https://127.0.0.1",
          times: [0, 1820],
          tags: ["tag1", "tag2", "tag3"],
          color: randomHexColor(),
          process: [{ label: "label1", value: "value 1111111" }],
          children: [
            {
              id: "1-1",
              label: "Service1-1",
              address: "https://127.0.0.11",
              times: [100, 1500],
              color: randomHexColor(),
              tags: ["tag4", "tag5", "tag6"],
              process: [{ label: "label1-1", value: "value 1111111-1" }],
              children: [
                {
                  id: "1-1-1",
                  label: "Service1-1-1",
                  address: "https://127.0.0.111",
                  times: [200, 1200],
                  color: randomHexColor(),
                  tags: ["tag7", "tag8", "tag9"],
                  process: [{ label: "label1-1-1", value: "value 1111111-1-1" }],
                  children: [
                    {
                      id: "1-1-1-1",
                      label: "Service1-1-1-1",
                      address: "https://127.0.0.111",
                      times: [500, 900],
                      color: randomHexColor(),
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
                  color: randomHexColor(),
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
          color: randomHexColor(),
          tags: ["tag13", "tag14", "tag15"],
          process: [{ label: "label2", value: "value 2222222" }],
          children: [
            {
              id: "2-1",
              label: "Service2-1",
              address: "https://127.0.0.21",
              times: [600, 1600],
              color: randomHexColor(),
              tags: ["tag16", "tag17", "tag18"],
              process: [{ label: "label2-1", value: "value 2222222-1" }],
              children: [
                {
                  id: "2-1-1",
                  label: "Service2-1-1",
                  address: "https://127.0.0.211",
                  times: [800, 1150],
                  color: randomHexColor(),
                  tags: ["tag19", "tag20", "tag21"],
                  process: [{ label: "label2-1-1", value: "value 2222222-1-1" }]
                },
                {
                  id: "2-1-2",
                  label: "Service2-1-2",
                  address: "https://127.0.0.212",
                  times: [800, 950],
                  color: randomHexColor(),
                  tags: ["tag22", "tag23", "tag24"],
                  process: [{ label: "label2-1-2", value: "value 2222222-1-2" }]
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>
