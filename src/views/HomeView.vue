<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.locolizeFilter("Account") }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <loader-component v-if="loading" />
    <div v-else class="row">
      <home-bill :rates="currency.rates" />
      <home-currency :rates="currency.rates" :data="currency.date" />
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Home",
  },
  name: "HomeView",
  data() {
    return {
      loading: true,
      currency: null,
    };
  },
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    },
  },
};
</script>
