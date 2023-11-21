<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <loader-component v-if="loading" />
    <p class="center" v-else-if="!records.length">
      Записей пока нет. <router-link to="/record">Добавьте запись</router-link>
    </p>
    <section v-else>
      <history-component :records="records" />
      <PaginateComponent
        :page-count="20"
        :click-handler="pageChangeHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'className'"
      />
    </section>
  </div>
</template>

<script>
export default {
  name: "history",
  data() {
    return {
      loading: true,
      records: [],
      categories: [],
    };
  },
  async mounted() {
    // this.records = await this.$store.dispatch("fetchRecords");
    const records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");
    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find((c) => c.id === record.categoryId)
          .title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход",
      };
    });
    this.loading = false;
  },
  methods: {
    pageChangeHandler() {},
  },
};
</script>

<style lang="scss"></style>
