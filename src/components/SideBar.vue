<template>
  <ul class="sidenav app-sidenav open">
    <RouterLink
      tag="li"
      to="/"
      exact-active-class="active"
      active-class="active"
    >
      <a href="#" class="waves-effect waves-orange pointer">Счет</a>
    </RouterLink>
    <li>
      <router-link to="/" class="waves-effect waves-orange pointer" exact
        >Счет</router-link
      >
    </li>
    <li>
      <router-link
        active-class="active"
        to="/history"
        class="waves-effect waves-orange pointer"
      >
        История
      </router-link>
    </li>
    <li>
      <router-link to="/planning" class="waves-effect waves-orange pointer"
        >Планирование</router-link
      >
    </li>
    <li>
      <router-link to="/record" class="waves-effect waves-orange pointer"
        >Новая запись</router-link
      >
    </li>
    <li>
      <router-link to="/categories" class="waves-effect waves-orange pointer"
        >Категории</router-link
      >
    </li>
  </ul>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "side-bar",
};
</script>

<style lang="scss"></style>
