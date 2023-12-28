<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.locolizeFilter("NewRecord") }}</h3>
    </div>
    <loader-component v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>{{ $filters.locolizeFilter("SelectCategory") }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{ $filters.locolizeFilter("Income") }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ $filters.locolizeFilter("Outcome") }}</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" v-model.number="amount" />
        <label for="amount">{{ $filters.locolizeFilter("Amount") }}</label>
        <span class="helper-text invalid" v-if="v$.amount.$error"
          >{{ $filters.locolizeFilter("MinValueOutcomes") }}
          {{ v$.amount.minValue.$params.min }}</span
        >
      </div>

      <div class="input-field">
        <input id="description" type="text" v-model="description" />
        <label for="description">{{
          $filters.locolizeFilter("Description")
        }}</label>
        <span class="helper-text invalid" v-if="v$.description.$error">{{
          $filters.locolizeFilter("EnterDesciption")
        }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $filters.locolizeFilter("Create") }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";
import getCurrentDate from "@/functions/CurrentDate";
export default {
  name: "record-view",
  data() {
    return {
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: "outcome",
      amount: 1,
      description: "",
    };
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      amount: { minValue: minValue(1) },
      description: { required },
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: getCurrentDate("datetime"),
          });
          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
          await this.$store.dispatch("updateInfo", { bill });
          this.$message(this.$filters.locolizeFilter("RecordUpdated"));
          this.v$.$reset();
          this.amount = 1;
          this.description = "";
        } catch (error) {}
      } else {
        this.$message(
          `${this.$filters.locolizeFilter("InsufficientFunds")} (${
            this.amount - this.info.bill
          })`
        );
      }
    },
  },
  destroyed() {
    if (this.select || this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>

<style lang="scss"></style>
