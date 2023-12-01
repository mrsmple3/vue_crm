<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.locolizeFilter("ProfileTitle") }}</h3>
    </div>

    <form class="form" @submit.prevent="onClick">
      <div class="input-field">
        <input id="description" type="text" v-model="name" />
        <label for="description">Имя</label>
        <span class="helper-text invalid" v-if="v$.$error">Name*</span>
      </div>
      <div class="switch" style="margin-bottom: 1.5rem">
        <label>
          Off
          <input type="checkbox" v-model="IsRulocale" />
          <span class="lever"></span>
          On
        </label>
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
import { mapGetters } from "vuex";

export default {
  name: "profile-view",
  data() {
    return {
      name: "",
      IsRulocale: true,
    };
  },
  computed: {
    ...mapGetters(["info"]),
  },
  mounted() {
    setTimeout(() => {
      M.updateTextFields();
    });
    this.name = this.info.name;
    this.IsRulocale = this.info.locale === "ru-RU";
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
    async onClick() {
      this.v$.$touch();
      if (this.v$.$error) return;
      try {
        await this.$store.dispatch("updateInfo", {
          name: this.name,
          locale: this.IsRulocale ? "ru-RU" : "en-US",
        });
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss"></style>
