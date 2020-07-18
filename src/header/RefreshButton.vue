<template>
  <div id="refresh-button">
    <button @click="handleRefreshClicked()">
      <i class="material-icons" :class="isRefreshing ? 'spin' : ''" style="font-size:36px">refresh</i>
      Refresh
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { bus } from "@/main";

@Component
export default class RefreshButton extends Vue {
  isRefreshing = false;

  handleRefreshClicked(): void {
    this.isRefreshing = true;
    bus.$emit("forceArticleReload");
  }

  mounted(): void {
    bus.$on("allArticlesFromServer", () => this.isRefreshing = false);
  }
}
</script>

<style lang='scss'>
#refresh-button {
  border-left: 1px solid $secondary;

  button {
    background-color: $primary;
    color: $secondary;
    padding: 0px 24px;
    font-size: 24px;
    font-weight: 600;
    border: none;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-width: 200px;
    transition: 0.3s;

    i {
      transition: 0.4s;

      &.spin {
        animation: spin 1s infinite;
      }
    }

    &:hover {
      background-color: $primaryLighter;
      cursor: pointer;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
