<template>
  <form class="card auth-card" @submit.prevent="onClick">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" v-model="email" />
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="v$.email.$error">Email*</small>
      </div>
      <div class="input-field">
        <input id="password" type="password" v-model="password" />
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-if="v$.password.$error"
          >Password* должен содержать {{ password.length }}/6
        </small>
      </div>
      <div class="input-field">
        <input id="name" type="text" v-model="name" />
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-if="v$.name.$error">Name*</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useStore } from "vuex";

export default {
  name: "registrate-view",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false,
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
      name: { required },
      agree: { checked: (v) => v },
    };
  },
  methods: {
    async onClick() {
      this.v$.$touch();
      if (this.v$.$error) return;

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.store.dispatch("register", formData);
        this.$router.push("/");
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss"></style>
