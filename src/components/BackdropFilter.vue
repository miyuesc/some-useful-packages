<template>
  <div class="backdrop-filter">
    <div class="card" style="--filter: blur(10px)">Blur 10px</div>
    <div class="card" style="--filter: brightness(60%)">Brightness 60%</div>
    <div class="card" style="--filter: contrast(40%)">Contrast 40%</div>
    <div class="card" style="--filter: drop-shadow(4px 4px 10px blue)">Drop Shadow</div>
    <div class="card" style="--filter: grayscale(60%)">Grayscale 60%</div>
    <div class="card" style="--filter: hue-rotate(120deg)">Hue Rotate 120deg</div>
    <div class="card" style="--filter: invert(70%)">Invert 70%</div>
    <div class="card" style="--filter: opacity(20%)">Opacity 20%</div>
    <div class="card" style="--filter: sepia(90%)">Sepia 90%</div>
    <div class="card" style="--filter: saturate(40%)">Saturate 40%</div>
    <div class="card" style="--filter: hue-rotate(270deg) blur(5px)">
      <p>Hue Rotate 270deg</p>
      <p>Blur 5px</p>
    </div>
    <div class="card" style="--filter: blur(10px)">
      <p>Doesn't seem to work on my iPad in Chrome or Safari!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackdropFilter"
};
</script>

<style scoped lang="scss">
.backdrop-filter {
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 40px;
  box-sizing: border-box;
  background: url("../assets/1.jpg") no-repeat center center;
  background-size: cover;
}
.card {
  width: 100%;
  aspect-ratio: 1;
  backdrop-filter: var(--filter);
  color: white;
  padding: 10px;
  box-sizing: border-box;
}
</style>
