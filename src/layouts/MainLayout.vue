<template>
  <div>
    <div class="app-main-layout">
      <nav-bar @menu="menu" />
      <side-bar v-if="menuOpen" />

      <main class="app-content">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <a class="btn-floating btn-large blue" href="#">
          <i class="large material-icons">add</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main-layout",
  data() {
    return {
      menuOpen: true,
    };
  },
  methods: {
    menu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style lang="scss" scoped></style>
