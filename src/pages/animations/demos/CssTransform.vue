<template>
  <div class="css-transform">
    <h1>Css3 Transform</h1>
    <!-- Rotate-->
    <div class="card">
      <div class="box rotate">
        <div class="fill"></div>
      </div>
      <p>rotate(45deg)</p>
    </div>
    <div class="card">
      <div class="box rotateX">
        <div class="fill"></div>
      </div>
      <p>rotateX(45deg)</p>
    </div>
    <div class="card">
      <div class="box rotateY">
        <div class="fill"></div>
      </div>
      <p>rotateY(45deg)</p>
    </div>
    <div class="card">
      <div class="box rotateZ">
        <div class="fill"></div>
      </div>
      <p>rotateZ(45deg)</p>
    </div>
    <!-- scale-->
    <div class="card">
      <div class="box scale">
        <div class="fill"></div>
      </div>
      <p>scale(2)</p>
    </div>
    <div class="card">
      <div class="box scaleX">
        <div class="fill"></div>
      </div>
      <p>scaleX(2)</p>
    </div>
    <div class="card">
      <div class="box scaleY">
        <div class="fill"></div>
      </div>
      <p>scaleY(2)</p>
    </div>
    <!-- skew-->
    <div class="card">
      <div class="box skew">
        <div class="fill"></div>
      </div>
      <p>skew(45deg, 45deg)</p>
    </div>
    <div class="card">
      <div class="box skewX">
        <div class="fill"></div>
      </div>
      <p>skewX(45deg)</p>
    </div>
    <div class="card">
      <div class="box skewY">
        <div class="fill"></div>
      </div>
      <p>skewY(45deg)</p>
    </div>
    <!-- translate-->
    <div class="card">
      <div class="box translate">
        <div class="fill"></div>
      </div>
      <p>translate(45px)</p>
    </div>
    <div class="card">
      <div class="box translateX">
        <div class="fill"></div>
      </div>
      <p>translateX(45px)</p>
    </div>
    <div class="card">
      <div class="box translateY">
        <div class="fill"></div>
      </div>
      <p>translateY(45px)</p>
    </div>
    <div class="card">
      <div class="box matrix">
        <div class="fill"></div>
      </div>
      <p>matrix(2, 2, 0, 2, 45, 0)</p>
    </div>
    <h4>Perspective : 100</h4>
    <div class="perspective-100">
      <div class="card">
        <div class="box rotateX">
          <div class="fill"></div>
        </div>
        <p>rotateX(90deg)</p>
      </div>
      <div class="card">
        <div class="box rotateY">
          <div class="fill"></div>
        </div>
        <p>rotateY(45deg)</p>
      </div>
    </div>
    <h4>Perspective : 200</h4>
    <div class="perspective-200">
      <div class="card">
        <div class="box rotateX">
          <div class="fill"></div>
        </div>
        <p>rotateX(90deg)</p>
      </div>
      <div class="card">
        <div class="box rotateY">
          <div class="fill"></div>
        </div>
        <p>rotateY(45deg)</p>
      </div>
    </div>
    <!-- transform origin-->
    <h2>Transform origin</h2>
    <div class="card">
      <div class="box rotate">
        <div class="fill to-100-0-0"></div>
      </div>
      <p>transform-origin : 100% 0 0 <br />rotate(45deg)</p>
    </div>
    <div class="card">
      <div class="box rotate">
        <div class="fill to-0-100-0"></div>
      </div>
      <p>transform-origin : 0 100% 0<br />rotate(45deg)</p>
    </div>
    <div class="card perspective-200">
      <div class="box rotateX">
        <div class="fill to-0-100-0"></div>
      </div>
      <p>transform-origin : 0 100% 0<br />rotateX(45deg)</p>
    </div>
    <div class="card perspective-200">
      <div class="box rotateX">
        <div class="fill to-100-0-0"></div>
      </div>
      <p>transform-origin : 100% 0 0<br />rotateX(45deg)</p>
    </div>
    <div class="card perspective-200">
      <div class="box rotateY">
        <div class="fill to-0-100-0"></div>
      </div>
      <p>transform-origin : 0 100% 0 <br />rotateY(45deg)</p>
    </div>
    <div class="card perspective-200">
      <div class="box rotateY">
        <div class="fill to-100-0-0"></div>
      </div>
      <p>transform-origin : 100% 0 0<br />rotateY(45deg)</p>
    </div>
    <div class="card">
      <div class="box scale">
        <div class="fill to-100-0-0"></div>
      </div>
      <p>transform-origin : 100% 0 0<br />scale(2)</p>
    </div>
    <div class="card">
      <div class="box scale">
        <div class="fill to-0-100-0"></div>
      </div>
      <p>transform-origin : 0 100% 0<br />scale(2)</p>
    </div>
    <div class="card">
      <div class="box scaleX">
        <div class="fill to-100-0-0"></div>
      </div>
      <p>transform-origin : 100% 0 0<br />scaleX(2)</p>
    </div>
    <div class="card">
      <div class="box scaleX">
        <div class="fill to-0-100-0"></div>
      </div>
      <p>transform-origin : 0 100% 0<br />scaleX(2)</p>
    </div>
    <div class="card">
      <div class="box scaleY">
        <div class="fill to-100-0-0"></div>
      </div>
      <p>transform-origin : 100% 0 0<br />scaleY(2)</p>
    </div>
    <div class="card">
      <div class="box scaleY">
        <div class="fill to-0-100-0"></div>
      </div>
      <p>transform-origin : 0 100% 0<br />scaleY(2)</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CssTransform"
};
</script>

<style scoped lang="scss">
.css-transform {
  height: 100%;
  overflow-y: auto;
  background: #f5f3f4;
  margin: 0;
  padding: 10px;
  font-family: "Open Sans", sans-serif;
  text-align: center;
}

h1 {
  font-size: 24px;
  line-height: 48px;
  color: #4c4c4c;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
}

h2,
h4 {
  line-height: 32px;
  font-weight: 400;
  color: #4d4d4d;
}

.card {
  display: inline-block;
  margin: 10px;
  background: #fff;
  padding: 15px;
  min-width: 200px;
  box-shadow: 0 3px 5px #ddd;
  color: #555;
}
.card .box {
  width: 100px;
  height: 100px;
  margin: auto;
  background: #ddd;
  cursor: pointer;
  box-shadow: 0 0 5px #ccc inset;
}
.card .box .fill {
  width: 100px;
  height: 100px;
  position: relative;
  background: #03a9f4;
  opacity: 0.5;
  box-shadow: 0 0 5px #ccc;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.card p {
  margin: 25px 0 0;
}

.rotate:hover .fill {
  transform: rotate(45deg);
}

.rotateX:hover .fill {
  transform: rotateX(45deg);
}

.rotateY:hover .fill {
  transform: rotateY(45deg);
}

.rotateZ:hover .fill {
  transform: rotate(45deg);
}

.scale:hover .fill {
  transform: scale(2, 2);
}

.scaleX:hover .fill {
  transform: scaleX(2);
}

.scaleY:hover .fill {
  transform: scaleY(2);
}

.skew:hover .fill {
  transform: skew(45deg, 45deg);
}

.skewX:hover .fill {
  transform: skewX(45deg);
}

.skewY:hover .fill {
  transform: skewY(45deg);
}

.translate:hover .fill {
  transform: translate(45px, 1em);
}

.translateX:hover .fill {
  transform: translateX(45px);
}

.translateY:hover .fill {
  transform: translateY(45px);
}

.matrix:hover .fill {
  transform: matrix(2, 2, 0, 2, 45, 0);
}

.perspective-100 .box {
  -webkit-perspective: 100px;
  perspective: 100px;
}

.perspective-200 .box {
  -webkit-perspective: 200px;
  perspective: 200px;
}

.to-100-0-0 {
  transform-origin: 100% 0 0;
}

.to-0-100-0 {
  transform-origin: 0 100% 0;
}
</style>
