<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ $filters.locolizeFilter("Amount") }}</th>
        <th>{{ $filters.locolizeFilter("Date") }}</th>
        <th>{{ $filters.locolizeFilter("Category") }}</th>
        <th>{{ $filters.locolizeFilter("Type") }}</th>
        <th>{{ $filters.locolizeFilter("Open") }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) in records" :key="record.id">
        <td>{{ index + 1 }}</td>
        <td>{{ $filters.currency(record.amount, "RUB") }}</td>
        <td>{{ record.date }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="record.typeClass">
            {{ record.typeText }}</span
          >
        </td>
        <td>
          <button
            v-tooltip="$filters.locolizeFilter('ViewRecording')"
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
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
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
