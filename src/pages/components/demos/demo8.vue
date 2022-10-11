<template>
  <div class="demo8">
    <h1>响应式测试 Page</h1>
    <el-button @click="updateData1">更改data1属性</el-button>
    <el-button @click="updateData2">更改data2属性</el-button>
    <el-button @click="resetData1">替换data1对象</el-button>
    <el-button @click="resetData2">替换data2对象</el-button>
    <test-demo :data1="data1" :data2="data2" />
  </div>
</template>

<script>
import Vue from "vue";
import { unObserver } from "../../../../utils/unObserver";

const TestDemo = Vue.component("test-demo", {
  template: `
<div class="test-demo">
<p style="padding: 8px 16px">data1 : {{ data1 }}</p>
<p style="padding: 8px 16px">data2 : {{ data2 }}</p>
<p style="padding: 8px 16px">obj1.a : {{ obj1.a }}</p>
<p style="padding: 8px 16px">obj2.a : {{ obj2.a }}</p>
<p style="padding: 8px 16px">num1 : {{ num1 }}</p>
<p style="padding: 8px 16px">$num2 : {{ $num2 }}</p>
<el-button @click="updateObj1">更改Obj1属性</el-button>
<el-button @click="updateObj2">更改Obj2属性</el-button>
<el-button @click="resetObj1">替换Obj1对象</el-button>
<el-button @click="resetObj2">替换Obj2对象</el-button>
<el-button @click="updateNum1">更新num1</el-button>
<el-button @click="updateNum2">更新num2</el-button>
</div>`,
  props: {
    data1: { type: Object },
    data2: { type: Object }
  },
  data() {
    return {
      obj1: { a: "obj1", b: "b1" },
      obj2: unObserver({ a: "obj2", b: "b2" }),
      num1: 1
      // $num2: 2 // 会报错，所以建议直接在 created 里面声明
    };
  },
  created() {
    this.$num2 = 2;
    console.log("testDemo", this);
  },
  methods: {
    updateObj1() {
      this.obj1.a += "-1";
    },
    resetObj1() {
      this.obj1 = { a: "reset obj1" };
    },
    updateObj2() {
      this.obj2.a += "-1";
    },
    resetObj2() {
      this.obj2 = unObserver({ a: "reset obj2" });
    },
    updateNum1() {
      this.num1 += 1;
    },
    updateNum2() {
      this.$num2 += 2;
    }
  },
  watch: {
    data1: {
      deep: true,
      handler(val) {
        console.log("data1 watch", val);
      }
    },
    data2: {
      deep: true,
      handler(val) {
        console.log("data2 watch", val);
      }
    },
    obj1: {
      deep: true,
      handler(val) {
        console.log("data1 watch", val);
      }
    },
    obj2: {
      deep: true,
      handler(val) {
        console.log("data1 watch", val);
      }
    },
    num1: {
      handler(val) {
        console.log("num1 watch", val);
      }
    },
    $num2: {
      handler(val) {
        console.log("num2 watch", val);
      }
    }
  }
});
export default {
  name: "demo8",
  components: { TestDemo },
  data() {
    return {
      data1: { a1: "data1", b: "b1" },
      data2: unObserver({ a1: "data2", b: "b2" })
    };
  },
  created() {
    console.log("parentDemo", this);
  },
  methods: {
    updateData1() {
      this.data1.a1 += "-1";
    },
    resetData1() {
      this.data1 = { a1: "reset data1" };
    },
    updateData2() {
      this.data2.a1 += "-1";
    },
    resetData2() {
      this.data2 = unObserver({ a1: "reset data2" });
    }
  }
};
</script>
