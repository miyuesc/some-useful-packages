<template>
  <div class="splitting-menus">
    <nav>
      <a href="#" class="nav__link">
        <span class="nav__link--text" data-splitting>Home</span>
        <span class="nav__link--text" data-splitting>Home</span>
      </a>
      <a href="#" class="nav__link">
        <span class="nav__link--text" data-splitting>About</span>
        <span class="nav__link--text" data-splitting>About</span>
      </a>
      <a href="#" class="nav__link">
        <span class="nav__link--text" data-splitting>Contact</span>
        <span class="nav__link--text" data-splitting>Contact</span>
      </a>
    </nav>
  </div>
</template>

<script>
import Splitting from "splitting";

export default {
  name: "Splitting3DMenus",
  mounted() {
    Splitting();
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");
:root {
  font-size: 16px;
  --link-translate-x: 3rem;
}
@media only screen and (max-width: 20rem) {
  :root {
    font-size: 10px;
    --link-translate-x: 2rem;
  }
}

.splitting-menus {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #010101;
  overflow: hidden;
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

a {
  text-decoration: none;
  &:focus {
    outline: none;
    border: none;
  }
}

.nav {
  &__link {
    font-size: 5rem;
    color: #fff;
    display: grid;
    font-style: italic;

    &--text {
      grid-area: 1/1;
      transition: opacity 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95),
        transform 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
      .word {
        white-space: nowrap;
      }
      .char {
        display: inline-block;
        transform-origin: 50% 50% 0.4em;
        transition: transform 0.5s cubic-bezier(0.5, 0, 0, 1);
        transition-delay: calc(0ms + var(--char-index) * 25ms);
        backface-visibility: hidden;
        margin: 0 -0.02em;
      }
    }

    &--text:nth-child(1) {
      font-family: "Playfair Display", sans-serif;
      font-weight: 500;
    }
    &--text:nth-child(2) {
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      opacity: 0;
      .char {
        //transform: rotate3d(1, -0.5, 0, 90deg);
        // OR
        transform: rotateX(90deg) rotateY(-45deg);
      }
    }

    &:hover {
      .nav__link--text {
        transform: translateX(var(--link-translate-x));
        &:nth-child(1) {
          opacity: 0;
          .char {
            //transform: rotate3d(1, 0.3, 0, -90deg);
            // OR
            transform: rotateX(-90deg) rotateY(-27deg);
          }
        }
        &:nth-child(2) {
          opacity: 1;
          .char {
            //transform: rotate3d(0, 0, 0, 90deg);
            // OR
            transform: rotate(0);
          }
        }
      }
    }
  }
}
</style>
