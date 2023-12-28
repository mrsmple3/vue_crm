<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{
            $filters.locolizeFilter("ExchangeRate")
          }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ $filters.locolizeFilter("Currency") }}</th>
              <th>{{ $filters.locolizeFilter("Rate") }}</th>
              <th>{{ $filters.locolizeFilter("Date") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currency" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ rates[cur].toFixed(4) }}</td>
              <td>{{ date || currentDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import getCurrentDate from "@/functions/CurrentDate";
export default {
  name: "home-currency",
  props: {
    rates: "",
    date: "",
  },
  data() {
    return {
      currency: ["RUB", "USD", "EUR"],
      currentDate: getCurrentDate(),
    };
  },
};
</script>

<style lang="scss" scoped></style>
