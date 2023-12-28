<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.locolizeFilter("Categories") }}</h3>
    </div>
    <section>
      <loader-component v-if="loading" />
      <div class="row" v-else>
        <category-create @created="addNewCategory" />

        <category-edit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategory"
        />
        <p v-else class="center">
          {{ $filters.locolizeFilter("CategoryNotDeclared") }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Categories",
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategory(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
  },
};
</script>

<style lang="scss"></style>
