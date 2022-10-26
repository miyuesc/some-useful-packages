<template>
  <div class="pumpkin-lantern" :class="{ active: active }">
    <svg width="600" height="600" viewBox="-300 -300 600 600" @click="active = !active">
      <defs>
        <linearGradient id="linear1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f4a74f" />
          <stop offset="100%" stop-color="#e48318" />
        </linearGradient>
        <linearGradient id="linear2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5963a" />
          <stop offset="100%" stop-color="#e27510" />
        </linearGradient>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color: #f4a74f" />
          <stop offset="100%" style="stop-color: #e48318" />
        </radialGradient>
        <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color: #f5963a" />
          <stop offset="100%" style="stop-color: #e27510" />
        </radialGradient>
        <radialGradient id="grad3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color: #f58a20" />
          <stop offset="100%" style="stop-color: #e27510" />
        </radialGradient>
      </defs>

      <ellipse cx="-56" cy="0" rx="140" ry="150" fill="url(#grad3)" />
      <ellipse cx="56" cy="0" rx="140" ry="150" fill="url(#grad3)" />

      <ellipse cx="-32" cy="0" rx="100" ry="150" fill="url(#grad2)" />
      <ellipse cx="32" cy="0" rx="100" ry="150" fill="url(#grad2)" />

      <ellipse rx="72" ry="150" fill="url(#grad1)" />

      <path class="trans-op" d="M -20,-50 A10 12 0 0 1 -80 -72 z" />
      <path class="trans-op" d="M 20,-50 A10 12 0 1 0 80 -72 z" />

      <path
        class="trans-op"
        d="M -120,20 A120 100 0 0 0 -12 80
           L -12,64 12,64 12,80
           A 120 100 0 0 0 120 20
           A 120 40 0 0 1 80 36
           L 80,48 66,48 66,36
           A 120 40 0 0 1 -66 36
           L -66,48 -80,48 -80,36
           A 120 40 0 0 1 -120 20
           z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "PumpkinLantern",
  data() {
    return {
      active: true
    };
  }
};
</script>

<style scoped lang="scss">
.pumpkin-lantern {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: rgba(1, 1, 1, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    background: none;
    box-shadow: 0 0 4px #8b5fda;
  }
  &.active {
    background: radial-gradient(circle, #f4a74f, #e48318, #f5963a, #e27510);
    background: radial-gradient(circle, #fffe95 10%, #0005);
    .trans-op {
      fill: #fffe95;
    }
  }
}
</style>
