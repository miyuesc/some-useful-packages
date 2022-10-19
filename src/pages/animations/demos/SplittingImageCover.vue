<template>
  <div class="splitting-image-cover">
    <div class="tiler">
      <img src="https://browser9.qhimg.com/bdm/1000_618_85/t01753453b660de14e9.jpg" alt="" />
    </div>
    <div class="tiler">
      <img src="https://browser9.qhimg.com/bdm/1000_618_85/t01bbd94b90e850d1d3.jpg" alt="" />
    </div>
    <div class="tiler">
      <img src="https://browser9.qhimg.com/bdm/1000_618_85/t019fd908f724f51900.jpg" alt="" />
    </div>
    <div class="tiler">
      <img src="https://browser9.qhimg.com/bdm/1000_618_85/t016ad88ddaf2ae2d92.jpg" alt="" />
    </div>
    <div class="tiler">
      <img src="https://browser9.qhimg.com/bdm/1000_618_85/t01cd97ec806b712059.jpg" alt="" />
    </div>
    <div class="tiler">
      <img src="https://browser9.qhimg.com/bdm/1000_618_85/t01a78941bc25ae2cf9.jpg" alt="" />
    </div>
    <div class="tiler">
      <img src="https://browser9.qhimg.com/bdm/1000_618_85/t01028e5f2ec69e423d.jpg" alt="" />
    </div>
    <div class="tiler">
      <img src="https://browser9.qhimg.com/bdm/1000_618_85/t01a7117bbc9683a7eb.jpg" alt="" />
    </div>
    <div class="tiler">
      <img src="https://browser9.qhimg.com/bdm/1000_618_85/t015d4f327880dddb26.jpg" alt="" />
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
  max-height: 494px;
  //  padding: 2em;
  //  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  display: flex;
  flex-wrap: wrap;
  margin: auto;
  background: #323643;
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
