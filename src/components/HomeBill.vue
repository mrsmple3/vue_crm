<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{
          $filters.locolizeFilter("CurrencyAccount")
        }}</span>

        <p v-for="cur in currency" :key="cur" class="currency-line">
          <span> {{ $filters.currency(getCurrency(cur), cur) }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-bill",
  props: {
    rates: "",
  },
  data() {
    return { currency: ["RUB", "USD", "EUR"] };
  },
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["RUB"] / this.rates["EUR"])
      );
    },
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },
};
</script>

<style lang="scss" scoped></style>
