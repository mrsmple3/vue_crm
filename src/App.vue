<template>
  <div id="#app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    MainLayout,
    EmptyLayout,
  },
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch("initAuth");
    });
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
