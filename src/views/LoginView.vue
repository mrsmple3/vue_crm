<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{
        $filters.locolizeFilter("HomeAccounting")
      }}</span>
      <div class="input-field">
        <input id="email" type="text" v-model.trim="email" />
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="v$.email.$error">Email*</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" v-model.trim="password" />
        <label for="password">{{ $filters.locolizeFilter("Password") }}</label>
        <small class="helper-text invalid" v-if="v$.password.$error"
          >Password* {{ password.length }}/6
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/registrate">{{
          $filters.locolizeFilter("Registrate")
        }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import messages from "@/utils/messages";
import { useStore } from "vuex";

export default {
  metaInfo: {
    title: "Login",
  },
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      store: useStore(),
    };
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    };
  },
  methods: {
    async submitHandler() {
      this.v$.$touch();
      if (this.v$.$error) return;
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.store.dispatch("login", formData);
        this.$router.push("/");
      } catch (error) {}
    },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
};
</script>

<style lang="scss"></style>
