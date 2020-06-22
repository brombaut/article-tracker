<template>
  <header>
    <img class="radar-logo" src="@/assets/radar.png" />
    <h1>BEC Article Tracker</h1>
    <div class="expand"></div>
    <div class="actions-container">
      <RandomArticleButton />
      <RefreshButton />
      <SignInDropdown />
      <AddArticleDropdown />
    </div>
  </header>
</template>

<script>
import AddArticleDropdown from '@/components/AddArticleDropdown.vue';
import SignInDropdown from '@/components/SignInDropdown.vue';
import RefreshButton from '@/components/RefreshButton.vue';
import RandomArticleButton from '@/components/RandomArticleButton.vue';

export default {
  name: 'MainHeader',
  components: {
    AddArticleDropdown,
    SignInDropdown,
    RefreshButton,
    RandomArticleButton,
  },
};
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
