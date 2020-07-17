<template>
  <th class="filter-header" :class="column.classList">
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

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Column from "./column";

@Component
export default class FilterHeader extends Vue {
  @Prop()
  column!: Column;
}
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

  @media only screen and (max-width: 500px) {
    input[type="text"] {
      padding: 2px;
      font-size: 0.8rem;
      width: calc(100% - 6px);
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
