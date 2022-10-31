<template>
  <div class="animation-box" ref="box">
    <div id="gallery">
      <div class="tile">
        <img
          src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHJhbmRvbSUyMG9iamVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=70"
        />
      </div>
      <div class="tile">
        <img
          src="https://images.unsplash.com/photo-1515266591878-f93e32bc5937?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsdWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=70"
        />
      </div>
      <div class="tile">
        <img
          src="https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=70"
        />
      </div>
      <div class="tile">
        <img
          src="https://images.unsplash.com/photo-1520121401995-928cd50d4e27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Z3JlZW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=70"
        />
      </div>
      <div class="tile">
        <img
          src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHVycGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=70"
        />
      </div>
      <div class="tile">
        <img
          src="https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=70"
        />
      </div>
      <div class="tile">
        <img
          src="https://images.unsplash.com/photo-1520338258525-606b90f95b04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRhcmslMjBibHVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=70"
        />
      </div>
      <div class="tile">
        <img
          src="https://images.unsplash.com/photo-1521127474489-d524412fd439?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fHJhbmRvbSUyMG9iamVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=70"
        />
      </div>
      <div class="tile">
        <img
          src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=70"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HoverGlideImage",
  mounted() {
    window.addEventListener("mousemove", this.animation);
    this.$once("hook:beforeDestroy", () => window.removeEventListener("mousemove", this.animation));
  },
  methods: {
    animation(e) {
      const gallery = document.getElementById("gallery");
      const mouseX = e.clientX,
        mouseY = e.clientY;

      const xDecimal = mouseX / this.$refs.box.clientWidth,
        yDecimal = mouseY / this.$refs.box.clientHeight;

      const maxX = gallery.offsetWidth - this.$refs.box.clientWidth,
        maxY = gallery.offsetHeight - this.$refs.box.clientHeight;

      const panX = maxX * xDecimal * -1,
        panY = maxY * yDecimal * -1;

      const animation = gallery.animate(
        {
          transform: `translate(${panX}px, ${panY}px)`
        },
        {
          duration: 4000,
          fill: "forwards",
          easing: "ease"
        }
      );

      animation.onfinish = () => animation.cancel();
    }
  }
};
</script>

<style scoped lang="scss">
.animation-box {
  background-color: rgb(10, 10, 10);
  height: 100%;
  margin: 0;
  overflow: hidden;
  position: relative;
}

#gallery {
  height: 120vmax;
  width: 120vmax;
  position: absolute;
}

.tile {
  border-radius: 1vmax;
  position: absolute;
  transition: transform 800ms ease;
}

.tile:hover {
  transform: scale(1.1);
}

.tile:hover > img {
  opacity: 1;
  transform: scale(1.01);
}

.tile > img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 800ms ease, transform 800ms ease;
}

.tile:nth-child(1) {
  background-color: rgb(255, 238, 88);
  height: 14%;
  width: 20%;
  left: 5%;
  top: 5%;
}

.tile:nth-child(2) {
  background-color: rgb(66, 165, 245);
  height: 24%;
  width: 14%;
  left: 42%;
  top: 12%;
}

.tile:nth-child(3) {
  background-color: rgb(239, 83, 80);
  height: 18%;
  width: 16%;
  left: 12%;
  top: 34%;
}

.tile:nth-child(4) {
  background-color: rgb(102, 187, 106);
  height: 14%;
  width: 12%;
  left: 45%;
  top: 48%;
}

.tile:nth-child(5) {
  background-color: rgb(171, 71, 188);
  height: 16%;
  width: 32%;
  left: 8%;
  top: 70%;
}

.tile:nth-child(6) {
  background-color: rgb(255, 167, 38);
  height: 24%;
  width: 24%;
  left: 68%;
  top: 8%;
}

.tile:nth-child(7) {
  background-color: rgb(63, 81, 181);
  height: 16%;
  width: 20%;
  left: 50%;
  top: 74%;
}

.tile:nth-child(8) {
  background-color: rgb(141, 110, 99);
  height: 24%;
  width: 18%;
  left: 72%;
  top: 42%;
}

.tile:nth-child(9) {
  background-color: rgb(250, 250, 250);
  height: 10%;
  width: 8%;
  left: 84%;
  top: 84%;
}
</style>
