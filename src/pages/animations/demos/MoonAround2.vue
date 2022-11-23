<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- 首先我们创建一个月亮 -->
    <!-- 我们再创建一条嫦娥绕月的轨道 -->
    <div class="satellite-orbits">
      <div class="mercury"></div>
      <!-- 我们让卫星相对于轨道对齐，然后z轴转动轨道，卫星也就开始绕月了，开始吧！ -->
      <div class="Change"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoonAround2",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// 创建月亮 素材图片来源国家航天局官网http://www.cnsa.gov.cn/n6758824/n6759009/n6759040/n6759287/c6794531/content.html
.mercury {
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 50%;
  margin-left: -300px;
  margin-top: -300px;
  height: 600px;
  width: 600px;
  background-size: 800px 600px !important;
  border-radius: 300px;
  //background: url(../assets/mercury.jpg);
  background: #999999;
  //为月亮添加box-shadow阴影，产生光照和立体效果。
  //属性介绍，（box-shadow）把一个或多个下拉阴影添加到框上。链接：https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow
  box-shadow: -90px 20px 50px 0 black inset, 0 0px 130px 40px rgba(73, 61, 59, 0.1) inset,
    0 0px 23px 4px rgba(230, 223, 221, 0.3) inset, -20px 0 60px 0 rgba(189, 183, 181, 0.3);
  // 然后我们让月亮转动起来 60秒一圈 一秒后开始转动，采用linear。
  // 为月亮添加过渡动画。
  /**  属性介绍：animation: autogiration 10s 1s infinite linear;。

    链接：https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation
  */
  animation-name: autogiration; //动画名称
  animation-duration: 10s; //持续时间
  animation-delay: 1s; //一秒后执行
  animation-iteration-count: infinite; //无限次播放
  animation-timing-function: linear; //匀速
  transform: rotateZ(0) rotateX(-70deg) scaleY(2);
  // transform: scaleY(2);
}
// 动画从x轴0px到x-1200px，产生月亮转动的效果
@keyframes autogiration {
  from {
    background-position-x: 0px;
    transform: rotateZ(0) rotateX(-70deg) scaleY(2);
  }
  to {
    background-position-x: -2400px;
    transform: rotateZ(-360deg) rotateX(-70deg) scaleY(2);
  }
}

// 创建一条围绕月球的轨道
.satellite-orbits {
  height: 1000px;
  width: 1000px;
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 50%;
  margin-left: -500px;
  margin-top: -500px;
  border: 7px solid rgba(189, 183, 181, 0.2);
  border-radius: 50%;
  //圆形已经画好了，然后我们调整轨道沿y轴压缩的比例为0.5。
  //属性介绍：scaleY(s)英语不好，就不翻译了：Is a <number> representing the scaling factor to apply on the ordinate of each point of the element.
  // transform: scaleY(0.5);
  transform: scaleY(0.5) rotateX(70deg) rotateZ(0);
  // 有点那意思了，但是问题来了，下方轨道应该是在月球上方。
  // 卧槽!怎么办。
  // 我一直相信没有解决不了的问题，只有解决不了问题的人，难道要解决自己吗？
  // 不行！我想想
  // 30m后。。发现了好东西。
  // transform-style：设置元素的子元素是位于 3D 空间中还是平面中。链接：https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-style。这不正是我要的吗？
  // “设置元素的子元素”，那就开始吧。
  // 调整dom结构让月亮成为轨道的子元素，设置preserve-3d让子元素位于 3D 空间中。
  transform-style: preserve-3d;
  // ok!有点那意思了 先这样。
  // 启动卫星
  // 上面是简写，那这里就全称了，就是玩。
  animation-name: operation; //动画名称
  animation-duration: 10s; //持续时间
  animation-delay: 1s; //一秒后执行
  animation-iteration-count: infinite; //无限次播放
  animation-timing-function: linear; //均速
}
// 然后我们的主角嫦娥卫星登场！
.Change {
  background: url(../../../assets/Change.png);
  background-size: 100%;
  width: 150px;
  height: 75px;
  position: absolute;
  top: calc(50% - 75px);
  right: 0;
  transform: rotateZ(0) rotateX(-70deg) scaleY(2); //校正
  // 毕竟卫星只是个平面图，咱们还是别让大家发现了。固定方向
  // 同时实现远近效果
  animation: revise-operation 10s 1s infinite linear;
}

//现在让嫦娥卫星根据轨道运行
@keyframes operation {
  from {
    transform: scaleY(0.5) rotateX(70deg) rotateZ(0);
  }
  to {
    transform: scaleY(0.5) rotateX(70deg) rotateZ(360deg);
  }
}
//校正并实现远近效果
@keyframes revise-operation {
  // from {
  // 	transform: rotateZ(0) rotateX(-70deg) scaleY(2);
  // }
  // to {
  // 	transform: rotateZ(-360deg) rotateX(-70deg) scaleY(2);
  // }

  // 分成四分 分别是代表 右下  左下 左上 右上区域。
  // 然后通过scale改变卫星大小实现远近效果。
  0% {
    transform: scale(1) rotateZ(0) rotateX(-70deg) scaleY(2);
  }
  25% {
    transform: scale(2) rotateZ(-90deg) rotateX(-70deg) scaleY(2);
  }
  50% {
    transform: scale(1) rotateZ(-180deg) rotateX(-70deg) scaleY(2);
  }
  75% {
    transform: scale(2) rotateZ(-270deg) rotateX(-70deg) scaleY(2);
  }
  100% {
    transform: scale(1) rotateZ(-360deg) rotateX(-70deg) scaleY(2);
  }
}
.cn {
  background: url(../../../assets/cn3.png);
  background-size: 100%;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(118px, 100px, 0px);
}
</style>
