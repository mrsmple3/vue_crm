<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/utils/messages";
import { watchEffect, ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";

export default {
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
  computed: {},
};
</script>

<style lang="scss" scoped></style>
