<template>
  <header>
    <img class="radar-logo" src="@/assets/radar.png" />
    <h1>BEC Article Tracker</h1>
    <div class="expand"></div>
    <div class="actions-container hide-small-screen">
      <RandomArticleButton />
      <RefreshButton />
      <SignInDropdown />
      <AddArticleDropdown />
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddArticleDropdown from "./AddArticleDropdown.vue";
import SignInDropdown from "./SignInDropdown.vue";
import RefreshButton from "./RefreshButton.vue";
import RandomArticleButton from "./RandomArticleButton.vue";

@Component({
  components: {
    AddArticleDropdown,
    SignInDropdown,
    RefreshButton,
    RandomArticleButton,
  },
})
export default class MainHeader extends Vue {}

</script>

<style lang='scss'>
header {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0;
  background-color: $primary;
  color: $secondary;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
  box-shadow: 0px 2px 10px 0px $secondary;

  .radar-logo {
    height: 60px;
    width: 60px;
    margin: 0 16px;
  }

  h3 {
    margin: 8px 0px;
  }

  .expand {
    flex: 1;
  }

  .actions-container {
    height: 100%;
    display: flex;
  }
}
</style>
