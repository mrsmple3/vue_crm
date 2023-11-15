<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>{{ counter }}</td>
        <td>1212</td>
        <td>{{ date }}</td>
        <td>name</td>
        <td>
          <span class="white-text badge red">Расход</span>
        </td>
        <td>
          <button class="btn-small btn">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "history-component",
  data() {
    return {
      loading: true,
      counter: 1,
      record: [],
      date: [],
      categories: [],
      type: [],
    };
  },
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);

      const progressColor = "red" ? this.type === "outcome" : "green";
      return {
        ...cat,
        progressColor,
        spend,
      };
    });
  },
  computed: {
    ...mapGetters(["info"]),
  },
};
</script>

<style></style>
