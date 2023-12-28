<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $filters.locolizeFilter("Edit") }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>{{ $filters.locolizeFilter("SelectCategory") }}</label>
        </div>

        <div class="input-field">
          <input id="name_edit" type="text" v-model="title" />
          <label for="name_edit">{{ $filters.locolizeFilter("Name") }}</label>
          <span class="helper-text invalid" v-if="v$.title.$error">{{
            $filters.locolizeFilter("EnterTitle")
          }}</span>
        </div>

        <div class="input-field">
          <input id="limit_edit" type="number" v-model.number="limit" />
          <label for="limit_edit">{{ $filters.locolizeFilter("Limit") }}</label>
          <span class="helper-text invalid" v-if="v$.limit.$error"
            >{{ $filters.locolizeFilter("MinValue") }}
            {{ v$.limit.minValue.$params.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $filters.locolizeFilter("UpdateBtn") }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  name: "category-edit",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      select: null,
      title: "",
      limit: 100,
      current: null,
    };
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0] || {};
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  validations() {
    return {
      title: { required },
      limit: { required, minValue: minValue(100) },
    };
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message(this.$filters.locolizeFilter("CategoryUpdated"));
        this.$emit("updated", categoryData);
      } catch (error) {}
    },
  },
  unmounted() {
    if (this.select || this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
