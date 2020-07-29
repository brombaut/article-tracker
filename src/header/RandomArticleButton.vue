<template>
  <div id="random-article-button">
    <button @click="handleRandomArticleClicked()">
      <i class="material-icons" style="font-size:32px">open_in_new</i>
      I'm Feeling Lucky
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { bus } from "@/main";
import Article from "../types/article";

@Component
export default class RandomArticleButton extends Vue {
  handleRandomArticleClicked(): void {
    bus.$emit("randomUnreadArticleRequest");
  }

  openRandomArticle(unreadArticleRecord: Article): void {
    const result = window.open(unreadArticleRecord.url, "_blank");
    if (result) {
      result.focus();
    }
    bus.$emit("articleClicked", unreadArticleRecord);
  }

  mounted(): void {
    bus.$on("randomUnreadArticleEmit", this.openRandomArticle);
  }
}
</script>

<style lang="scss">
#random-article-button {
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
      margin-right: 8px;
    }

    &:hover {
      background-color: $primaryLighter;
      cursor: pointer;
    }
  }
}
</style>
