<template>
  <div class="box-item">
    <div
      v-for="(item, index) in orderNum"
      :class="{ 'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
      :key="index"
    >
      <span v-if="!isNaN(item)">
        <i ref="numberItem">0123456789</i>
      </span>
      <span class="comma" v-else>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "NumberRoll",
  props: {
    value: {
      type: Number, // 具体数值
      default() {
        return 0;
      }
    },
    time: {
      type: Number, // 滚动要花的时间，单位秒
      default() {
        return 1;
      }
    }
  },
  data() {
    return {
      orderNum: ["0", "0", ",", "0", "0", "0", ",", "0", "0", "0"] // 默认订单总数
    };
  },
  mounted() {
    this.toOrderNum(this.value); // 这里输入数字即可调用
    // this.increaseNumber(this.time);
  },
  watch: {
    value: {
      handler() {
        this.toOrderNum(this.value);
        this.setNumberTransform();
      }
    }
  },
  methods: {
    // 定时增长数字
    increaseNumber(time) {
      // const self = this;
      // this.timer = setInterval(() => {
      //     self.newNumber = self.newNumber + self.getRandomNumber(1, 100);
      //     self.setNumberTransform();
      // }, time * 1000);
    },
    // 设置文字滚动
    setNumberTransform() {
      const numberItems = this.$refs.numberItem; // 拿到数字的ref，计算元素数量
      const numberArr = this.orderNum.filter((item) => !isNaN(item));
      // 结合CSS 对数字字符进行滚动,显示订单数量
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index];
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`;
      }
    },
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // 处理传过来的具体值value
    toOrderNum(num) {
      const numArr = num.toString().split("");
      const len = numArr.length;
      if (len < 4) {
        // 不处理
      } else if (len < 7) {
        numArr.splice(len - 3, 0, ",");
      } else if (len < 10) {
        numArr.splice(len - 3, 0, ",");
        numArr.splice(len - 6, 0, ",");
      } else if (len < 13) {
        numArr.splice(len - 3, 0, ",");
        numArr.splice(len - 6, 0, ",");
        numArr.splice(len - 9, 0, ",");
      }
      this.orderNum = numArr;
    }
  }
};
</script>
<style scoped lang="scss">
/*具体值value总量滚动数字设置*/
.box-item {
  height: 2vw;
  color: #8af6fd;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
/* 默认逗号设置 */
.mark-item {
  width: 0.2vw;
  height: 1.5vw;
  font-size: 1.4vw;
  position: relative;
  margin-right: 0.2vw;
  & > span {
    position: absolute;
    width: 100%;
    left: 0;
  }
}
/*滚动数字设置*/
.number-item {
  width: 0.8vw;
  height: 1.5vw;
  list-style: none;
  & > span {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    writing-mode: vertical-rl;
    text-orientation: upright;
    overflow: hidden;
    & > i {
      font-style: normal;
      position: absolute;
      top: 0;
      left: 50%;
      letter-spacing: 0.25vw;
      font-size: 1.4vw;
      transform: translate(-50%, 0);
      transition: transform 1s ease-in-out;
    }
  }
}
.number-item:last-child {
  margin-right: 0;
}
</style>
