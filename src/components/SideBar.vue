<template>
  <ul class="sidenav app-sidenav" :class="{ open: menuOpen }">
    <li>
      <router-link to="/" class="waves-effect waves-orange pointer">{{
        $filters.locolizeFilter("Account")
      }}</router-link>
    </li>
    <li>
      <router-link to="/history" class="waves-effect waves-orange pointer">
        {{ $filters.locolizeFilter("History") }}
      </router-link>
    </li>
    <li>
      <router-link to="/planning" class="waves-effect waves-orange pointer">{{
        $filters.locolizeFilter("Planning")
      }}</router-link>
    </li>
    <li>
      <router-link to="/record" class="waves-effect waves-orange pointer">{{
        $filters.locolizeFilter("NewRecord")
      }}</router-link>
    </li>
    <li>
      <router-link to="/categories" class="waves-effect waves-orange pointer"
        >{{ $filters.locolizeFilter("Categories") }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    menuOpen: {
      type: Boolean,
      required: true,
    },
  },
  name: "side-bar",
};
</script>

<style lang="scss"></style>
