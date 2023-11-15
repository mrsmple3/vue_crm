<template>
  <loader-component v-if="loading" />
  <div v-else>
    <div class="app-main-layout">
      <nav-bar @menu="menu" />
      <side-bar :menuOpen="menuOpen" />

      <main class="app-content" :class="{ full: !menuOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          data-position="top"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import messages from "@/utils/messages";
import { useStore } from "vuex";
import { watchEffect, ref, getCurrentInstance } from "vue";

export default {
  name: "main-layout",
  setup() {
    const store = useStore();
    const error = ref(null);
    const instance = getCurrentInstance();

    watchEffect(async () => {
      error.value = await store.getters.error;
    });

    watchEffect(() => {
      if (error.value) {
        instance.appContext.config.globalProperties.$error(
          messages[error.value.code] || "Что то пошло не так"
        );
      }
    });

    return { error };
  },
  data() {
    return {
      menuOpen: true,
      loading: true,
    };
  },
  methods: {
    menu() {
      this.menuOpen = !this.menuOpen;
    },
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped></style>
