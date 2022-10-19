<template>
  <div class="splitting-3d-clock">
    <div class="clock" ref="clock">
      <span class="cog hours tens" data-splitting>0123456789</span>
      <span class="cog hours" data-splitting>0123456789</span>
      <span class="colon">:</span>
      <span class="cog minutes tens" data-splitting>0123456789</span>
      <span class="cog minutes" data-splitting>0123456789</span>
      <span class="colon">:</span>
      <span class="cog seconds tens" data-splitting>0123456789</span>
      <span class="cog seconds" data-splitting>0123456789</span>
    </div>
  </div>
</template>

<script>
import Splitting from "splitting";
export default {
  name: "Splitting3DClock",
  mounted() {
    Splitting();
    this.updateTime();
  },
  methods: {
    leadingZeroString(n) {
      return ("0" + n).slice(-2);
    },
    updateTime() {
      const d = new Date();
      const h = this.leadingZeroString(d.getHours());
      const m = this.leadingZeroString(d.getMinutes());
      const s = this.leadingZeroString(d.getSeconds());

      this.$refs.clock.style.setProperty("--h1", h[0]);
      this.$refs.clock.style.setProperty("--h2", h);
      this.$refs.clock.style.setProperty("--m1", m[0]);
      this.$refs.clock.style.setProperty("--m2", m);
      this.$refs.clock.style.setProperty("--s1", s[0]);
      this.$refs.clock.style.setProperty("--s2", s);

      setTimeout(this.updateTime, 1000);
    }
  }
};
</script>

<style lang="scss">
$bg: #010101;
$color: #fefefe;
.splitting-3d-clock {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $bg;
  display: flex;
  justify-content: center;
  align-items: center;
  .clock {
    --h1: 1;
    --h2: 2;
    --m1: 3;
    --m2: 4;
    --s1: 5;
    --s2: 6;
    --time-offset: 0;
    width: 100%;
    height: 6em;
    background: rgba($bg, 0.8);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    color: $color;
    font-size: 8vmin;
    letter-spacing: 0.1em;
    perspective: 500px;

    &,
    &:before,
    * {
      box-sizing: border-box;
      transform-style: preserve-3d;
    }

    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba($bg, 0.9) 20%,
        transparent calc(50% - 0.4ch),
        transparent calc(50% + 0.4ch),
        rgba($bg, 0.9) 80%
      );
      transform: translateZ(2.6em);
    }
  }

  .colon {
    display: inline-block;
    opacity: 0.8;
    transform: translateZ(2.5em);
    width: 1ch;
    margin: 0;
    text-align: center;
  }

  .cog {
    position: relative;
    width: 1ch;
    height: 1ch;
    margin: -0.25ch 0.1ch 0;

    display: inline-block;

    // --unit: 2;

    transition: transform 0.3s cubic-bezier(0.4, 0, 0.6, 1);
    transform: rotateX(calc(-1turn * (var(--unit) / var(--char-total))));

    .word,
    .char {
      position: absolute;
      top: 0;
      left: 0;
      width: 1ch;
      height: 1ch;
    }

    .char {
      transform: rotateX(calc(4deg + (360deg * var(--char-percent)))) translateZ(2.5em);
    }
  }

  .tens {
    text-align: right;
  }

  .hours.tens {
    --unit: var(--h1);
  }
  .hours {
    --unit: var(--h2);
  }
  .minutes.tens {
    --unit: var(--m1);
  }
  .minutes {
    --unit: var(--m2);
  }
  .seconds.tens {
    --unit: var(--s1);
  }
  .seconds {
    --unit: var(--s2);
  }
}
</style>
