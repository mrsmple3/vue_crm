<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="name" type="text" v-model="title" />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="v$.title.$error"
            >Введите название</span
          >
        </div>

        <div class="input-field">
          <input id="limit" type="number" v-model.number="limit" />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="v$.limit.$error"
            >Минимальная величина {{ v$.limit.minValue.$params.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
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
  name: "category-create",
  data() {
    return {
      title: "",
      limit: 100,
    };
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      title: { required },
      limit: { minValue: minValue(100) },
    };
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        const category = this.$store.dispatch("createCategory", {
          title: this.title,
          limit: this.limit,
        });
        this.title = "";
        this.limit = 100;
        this.v$.$reset();
        this.$message("Категория была создана");
        this.$emit("created", category);
      } catch (error) {}
    },
  },
};
</script>
