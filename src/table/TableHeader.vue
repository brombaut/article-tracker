<template>
  <th :class="column.classList">
    <div class="column-headers-primary">
      <div class="column-header-title">{{ column.title }}</div>
      <div class="column-header-sort-icons">
        <i
          :class="{'material-icons': true, 'selectedSort': ascendingSortActive }"
          @click="setAscendingSort()"
        >arrow_drop_up</i>
        <i
          :class="{'material-icons': true, 'selectedSort': descendingSortActive }"
          @click="setDescendingSort()"
        >arrow_drop_down</i>
      </div>
    </div>
  </th>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Column from "./column";

@Component
export default class TableHeader extends Vue {
  @Prop()
  column!: Column;

  @Prop()
  sortString!: string;

  get ascendingSortActive(): boolean {
    return this.sortString === `${this.column.key}-ascending`;
  }

  get descendingSortActive(): boolean {
    return this.sortString === `${this.column.key}-descending`;
  }

  setAscendingSort(): void {
    this.$emit("sortButtonClicked", { attribute: this.column.key, type: "ascending" });
  }

  setDescendingSort(): void {
    this.$emit("sortButtonClicked", { attribute: this.column.key, type: "descending" });
  }
}
</script>

<style lang="scss">
.column-headers-primary {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .column-header-title {
    font-size: 20px;
    margin-right: 8px;
  }

  @media only screen and (max-width: 500px) {
    .column-header-title {
      font-size: 0.8rem;
      margin-right: 2px;
    }
  }

  .column-header-sort-icons {
    display: flex;
    flex-direction: column;

    i {
      font-size: 32px;
      margin: -6px;

      &:hover {
        cursor: pointer;
        color: $primaryBrightest;
      }
    }

    .selectedSort {
      color: $primaryBrighter;
    }
  }
}
</style>
