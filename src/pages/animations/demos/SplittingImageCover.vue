<template>
  <div class="splitting-image-cover">
    <div class="tiler">
      <img src="https://picsum.photos/1000/600?image=1067" />
    </div>
    <div class="tiler">
      <img src="https://picsum.photos/1000/600?image=1061" />
    </div>
    <div class="tiler">
      <img src="https://picsum.photos/1000/600?image=1057" />
    </div>
    <div class="tiler">
      <img src="https://picsum.photos/1000/600?image=1052" />
    </div>
    <div class="tiler">
      <img src="https://picsum.photos/1000/600?image=1043" />
    </div>
    <div class="tiler">
      <img src="https://picsum.photos/1000/600?image=1055" />
    </div>
    <div class="tiler">
      <img src="https://picsum.photos/1000/600?image=1036" />
    </div>
    <div class="tiler">
      <img src="https://picsum.photos/1000/600?image=1037" />
    </div>
    <div class="tiler">
      <img src="https://picsum.photos/1000/600?image=1039" />
    </div>
  </div>
</template>

<script>
import Splitting from "splitting";
export default {
  name: "SplittingImageCover",
  mounted() {
    Splitting({
      target: ".tiler",
      by: "cells",
      rows: 3,
      columns: 3,
      image: true
    });
  }
};
</script>

<style lang="scss">
.splitting-image-cover {
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  padding: 2em;
  margin: auto;
  background: #323643;
  position: relative;
  box-sizing: border-box;
}

.tiler {
  display: inline-block;
  cursor: pointer;
  visibility: hidden;
  width: 33.3%;
  margin: auto;
}

.tiler img {
  display: block;
  margin: auto;
  max-width: 800px;
  visibility: visible;
}

.tiler .cell-grid {
  background-position: center center;
  margin: auto;
  position: fixed;
  top: 1em;
  bottom: 1em;
  left: 1em;
  right: 1em;
  z-index: 10;
  max-width: 1000px;
  max-height: 600px;
  perspective: 30px;
}

.tiler .cell {
  pointer-events: none;
  opacity: 0;

  transform: translateZ(-15px);
  transform-style: preserve-3d;

  transition-property: transform, opacity;
  transition-duration: 0.5s, 0.4s;
  transition-timing-function: cubic-bezier(0.65, 0.01, 0.15, 1.33);

  /* The center character index */
  --center-x: calc((var(--col-total) - 1) / 2);
  --center-y: calc((var(--row-total) - 1) / 2);

  /* Offset from center, positive & negative */
  --offset-x: calc(var(--col-index) - var(--center-x));
  --offset-y: calc(var(--row-index) - var(--center-y));

  /* Absolute distance from center, only positive */
  --distance-x: calc((var(--offset-x) * var(--offset-x)) / var(--center-x));

  /* Absolute distance from center, only positive */
  --distance-y: calc((var(--offset-y) * var(--offset-y)) / var(--center-y));

  transition-delay: calc(0.1s * var(--distance-y) + 0.1s * var(--distance-x));
}

.tiler {
  transition: z-index 0.3s linear;
}

.tiler-overlay {
  z-index: 2;
}
.tiler:hover {
  .cell {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
