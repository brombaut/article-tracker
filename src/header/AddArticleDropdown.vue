<template>
  <div id="add-article-dropdown" :class="{'show-dropdown': showDropdown}">
    <button class="dropbtn border-left" @click="handleDropwdownClicked()">
      <i class="material-icons" style="font-size:60px">arrow_drop_down</i>Add Article
    </button>
    <div class="dropdown-content">
      <AddArticleForm />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { bus } from "@/main";
import AddArticleForm from "./AddArticleForm.vue";

@Component({
  components: {
    AddArticleForm,
  },
})
export default class AddArticleDropdown extends Vue {
  showDropdown = false;

  handleDropwdownClicked(): void {
    this.showDropdown = !this.showDropdown;
    bus.$emit("addArticleOpened");
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  mounted(): void {
    bus.$on("signInOpened", this.closeDropdown);
  }
}
</script>

<style lang='scss'>
#add-article-dropdown {
  position: relative;
  display: inline-block;
  border-left: 1px solid $secondary;

  button {
    background-color: $primary;
    color: $secondary;
    padding: 0px 16px;
    font-size: 24px;
    font-weight: 600;
    border: none;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    transition: 0.3s;

    i {
      transition: 0.4s;
    }

    &:hover {
      background-color: $primaryLighter;
      cursor: pointer;
    }
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    width: 800px;
    padding-top: 20px;
    padding-bottom: 60px;
    padding-left: 40px;
    padding-right: 40px;
    background-color: $primaryLighter;
    color: $secondary;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  &.show-dropdown {
    .dropdown-content {
      display: block;
    }
    .dropbtn {
      background-color: $primaryLighter;

      i {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
