<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="onClick">
      <div class="input-field">
        <input id="description" type="text" v-model="name" />
        <label for="description">Имя</label>
        <span class="helper-text invalid" v-if="v$.$error">Name*</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "profile-view",
  data() {
    return {
      name: "",
    };
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      name: { required },
    };
  },
  methods: {
    onClick() {
      this.v$.$touch();
      if (this.v$.$error) return;
      const formData = {
        name: this.name,
      };
      window.location.reload();
    },
  },
};
</script>

<style lang="scss"></style>
