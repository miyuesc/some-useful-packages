<template>
  <div class="splitting-text">
    <span class="intro">Make the web less</span>
    <span class="main" aria-label="boring" data-splitting>Boring</span>
  </div>
</template>

<script>
import Splitting from "splitting";

export default {
  name: "SplittingText",
  mounted() {
    Splitting();
  }
};
</script>

<style lang="scss">
:root {
  --fluid-type-min: 2rem;
  --fluid-type-max: 10rem;
  --fluid-type-target: 5vw;
  --color: #dbe3ea;
}

.splitting-text {
  background: #24313c;
  color: var(--color);
  padding: 2rem;
  font-family: "Cabin Condensed", sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  display: grid;
  place-items: center;
}

.splitting-text > span {
  line-height: 1;
  font-size: clamp(
    var(--fluid-type-min, 1rem),
    calc(1rem + var(--fluid-type-target, 3vw)),
    var(--fluid-type-max, 1.3rem)
  );
  display: block;
}

.main {
  --fluid-type-min: 8rem;
  --fluid-type-max: 20rem;
  --fluid-type-target: 20vw;
  font-family: acier-bat-gris, sans-serif;
  font-weight: 400;
  font-style: normal;
  line-height: 0.7;
  margin-left: -0.06ch;
}

.main .char {
  cursor: zoom-in;
  transform-origin: center bottom;
  transition: transform 400ms cubic-bezier(0.4, 0, 0.7, 1.8), color 400ms ease;
  color: var(--color);
  box-shadow: none;
}

.main .char:nth-child(3),
.main .char:nth-child(4) {
  letter-spacing: 0.02ch;
}

.main .char:hover {
  transform: scale(1.4);
  transition-duration: 200ms;
  text-shadow: 0px 0px 3px black, 0px 0px 20px var(--color);
  z-index: 1;
}

.main .char:nth-child(1):hover {
  --color: #ffd300;
}

.main .char:nth-child(2):hover {
  --color: #de38c8;
}

.main .char:nth-child(3):hover {
  --color: #8b5fda;
}

.main .char:nth-child(4):hover {
  --color: #86bbd8;
}

.main .char:nth-child(5):hover {
  --color: #d3f6db;
}

.main .char:nth-child(6):hover {
  --color: #eb9486;
}
</style>
