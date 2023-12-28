<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.locolizeFilter("RecordHistory") }}</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <loader-component v-if="loading" />
    <p class="center" v-else-if="!records.length">
      Записей пока нет. <router-link to="/record">Добавьте запись</router-link>
    </p>
    <section v-else>
      <history-component :records="items" />
    </section>
  </div>
  <paginate
    v-model="page"
    :page-count="pageCount"
    :click-handler="pageChangeHandler"
    :prev-text="'<'"
    :next-text="'>'"
    :container-class="'pagination'"
    :page-class="'waves-effect'"
  >
  </paginate>
</template>

<script>
import Paginate from "vuejs-paginate-next";
import paginationMixin from "@/mixin/pagination.mixin";
export default {
  metaInfo: {
    title: "Histrory",
  },
  name: "history",
  components: {
    paginate: Paginate,
  },
  mixins: [paginationMixin],
  data() {
    return {
      loading: true,
        records: [],
      };
  },
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");

    const categories = await this.$store.dispatch("fetchCategories");

    this.setupPagination(
      this.records.map((record) => {
        return {
          ...record,
          categoryName: categories.find((c) => c.id === record.categoryId)
            .title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText: record.type === "income" ? "Доход" : "Расход",
        };
      })
    );
    this.loading = false;
  },
};
</script>

<style lang="scss"></style>
