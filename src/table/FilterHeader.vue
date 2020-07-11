<template>
  <th class="filter-header">
    <input
      v-if="column.filter.filterType === 'text'"
      type="text"
      :placeholder="column.filter.placeholder"
      @input="(e) => column.filter.onchange(e.target.value)"
    />
    <select
      v-if="column.filter.filterType === 'select'"
      id="filter-read"
      @input="(e) => column.filter.onchange(e.target.value)"
    >
      <option value>All</option>
      <option value="read">Read</option>
      <option value="unread">Unread</option>
    </select>
  </th>
</template>

<script>
export default {
  name: "FilterHeader",
  props: {
    column: Object,
  },
};
</script>

<style lang="scss">
.filter-header {
  padding: 0 !important;

  input[type="text"] {
    padding: 6px;
    width: calc(100% - 14px);
    font-size: 16px;
    background-color: $primaryLighter;
    color: $secondary;
    border: 1px solid $primary;

    &:focus {
      border: 1px solid #42b983;
    }
  }

  #filter-read {
    padding: 6px;
    width: 100%;
    font-size: 16px;
    background-color: $primaryLighter;
    color: $secondary;
    border: 1px solid $primary;
  }
}
</style>
