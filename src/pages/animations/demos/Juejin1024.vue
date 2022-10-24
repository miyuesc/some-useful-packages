<template>
  <div class="juejin-1024">
    <div class="demo-cube">
      <ul class="cube-inner">
        <li class="top"></li>
        <li class="bottom"></li>
        <li class="front"></li>
        <li class="back"></li>
        <li class="right"></li>
        <li class="left"></li>
      </ul>
      <ul class="cube">
        <li class="top"></li>
        <li class="bottom"></li>
        <li class="front"></li>
        <li class="back"></li>
        <li class="right"></li>
        <li class="left"></li>
      </ul>
    </div>

    <div class="demo-cube perspective">
      <ul class="cube-inner">
        <li class="top"></li>
        <li class="bottom"></li>
        <li class="front"></li>
        <li class="back"></li>
        <li class="right"></li>
        <li class="left"></li>
      </ul>
      <ul class="cube">
        <li class="top"></li>
        <li class="bottom"></li>
        <li class="front"></li>
        <li class="back"></li>
        <li class="right"></li>
        <li class="left"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Juejin1024"
};
</script>

<style scoped lang="scss">
.juejin-1024 {
  width: 100%;
  height: 100%;
  background-color: #776aff;
  position: relative;
  overflow: hidden;
}
ul {
  padding: 0;
  list-style: none;
}

.demo-cube {
  position: relative;
  width: 100%;
  height: 200px;

  .cube-inner {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    transform-style: preserve-3d;
    transform-origin: 25px 25px;
    transform: rotateX(-33.5deg) rotateY(45deg);
    animation: fastspin 6s ease-in-out infinite 2s;

    li {
      position: absolute;
      display: block;
      width: 50px;
      height: 50px;
      background: #175d96;
      border: 1px solid #fff;
    }
    .top {
      transform: rotateX(90deg) translateZ(25px);
    }
    .bottom {
      transform: rotateX(-90deg) translateZ(25px);
    }
    .front {
      transform: translateZ(25px);
    }
    .back {
      transform: rotateX(-180deg) translateZ(25px);
    }
    .left {
      transform: rotateY(-90deg) translateZ(25px);
    }
    .right {
      transform: rotateY(90deg) translateZ(25px);
    }
  }

  .cube {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;
    transform-style: preserve-3d;
    transform-origin: 50px 50px;
    transform: rotateX(-33.5deg) rotateY(45deg);
    animation: slowspin 6s ease-in-out infinite 2s;

    li {
      position: absolute;
      display: block;
      width: 100px;
      height: 100px;
      background: rgba(141, 214, 249, 0.5);
      border: 1px solid #fff;
    }
    .top {
      transform: rotateX(90deg) translateZ(50px);
    }
    .bottom {
      transform: rotateX(-90deg) translateZ(50px);
    }
    .front {
      transform: translateZ(50px);
    }
    .back {
      transform: rotateX(-180deg) translateZ(50px);
    }
    .left {
      transform: rotateY(-90deg) translateZ(50px);
    }
    .right {
      transform: rotateY(90deg) translateZ(50px);
    }
  }
}

@keyframes fastspin {
  0% {
    transform: rotateX(-33.5deg) rotateY(45deg);
  }
  40%,
  to {
    transform: rotateX(-33.5deg) rotateY(-315deg);
  }
}

@keyframes slowspin {
  0% {
    transform: rotateX(-33.5deg) rotateY(45deg);
  }
  40%,
  to {
    transform: rotateX(-33.5deg) rotateY(315deg);
  }
}
</style>
