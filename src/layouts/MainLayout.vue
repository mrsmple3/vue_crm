<template>
  <div>
    <div class="app-main-layout">
      <nav-bar @menu="menu" />
      <side-bar :menuOpen="menuOpen" />

      <main class="app-content" :class="{ full: !menuOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
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
