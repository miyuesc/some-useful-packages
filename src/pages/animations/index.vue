<template>
  <div class="animations-content">
    <div class="wrap">
      <div class="orbit"></div>
      <div class="planet">
        <div class="ball">
          <p>集团</p>
          <p>平台</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Animations"
};
</script>

<style lang="scss" scoped>
.animations-content {
  width: 100%;
  height: 100%;
}
#root {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: unset;
}
$primary-light: #8abdff;
$primary: #6d5dfc;
$primary-dark: #35048f;

$white: #ffffff;
$greyLight-1: #e4ebf5;
$greyLight-2: #c8d0e7;
$greyLight-3: #bec8e4;
$greyDark: #9baacf;
$shadow: 0.3rem 0.3rem 0.6rem $greyLight-2, -0.2rem -0.2rem 0.5rem $white;
$inner-shadow: inset 0.2rem 0.2rem 0.5rem $greyLight-2, inset -0.2rem -0.2rem 0.5rem $white;

.wrap {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

@keyframes planet-rotate {
  0% {
    z-index: 0;
    transform: rotate(60deg) scaleY(0.5) rotate(0);
  }
  40% {
    z-index: 0;
  }
  70% {
    z-index: 2;
  }
  90% {
    z-index: 0;
  }
  100% {
    z-index: 0;
    transform: rotate(60deg) scaleY(0.5) rotate(360deg);
  }
}
@keyframes self-rotate {
  0% {
    transform: rotate(0) scaleY(2) rotate(-60deg);
  }
  100% {
    transform: rotate(-360deg) scaleY(2) rotate(-60deg);
  }
}

.planet {
  position: absolute;
  width: 400px;
  height: 400px;
  transform-style: preserve-3d;
  border-radius: 50%;
  animation: planet-rotate 5s linear infinite;
}
.orbit {
  position: absolute;
  border: 8px solid #8b5fda;
  background-color: #c3b1e3;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  transform-style: preserve-3d;
  //transform: rotateX(65deg) rotateY(36deg);
  z-index: 1;
}

.ball {
  width: 100px;
  height: 100px;
  left: 0;
  top: -50px;
  position: absolute;
  border-radius: 50%;
  background: $primary;
  box-shadow: inset -0.2rem 0.2rem 0.5rem 0 #ffffff, inset 0.2rem -0.2rem 0.5rem 0 $primary-dark;
  color: $greyLight-1;
  animation: self-rotate 5s linear infinite;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 24px;
  &:hover {
    //&::before {
    //  backdrop-filter: brightness(200);
    //}
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 50%;
  }
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    right: 16px;
    top: 16px;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 0 0 12px 12px #ffffff;
  }
}
</style>
