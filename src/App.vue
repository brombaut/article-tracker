<template>
  <div id="app">
    <span id="desktop-wrapper">
      <MainHeader />
      <ArticlesContainer />
      <ServerCommunication />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainHeader from "./header/MainHeader.vue";
import ServerCommunication from "./server/ServerCommunication.vue";
import ArticlesContainer from "./table/ArticlesContainer.vue";

@Component({
  components: {
    MainHeader,
    ServerCommunication,
    ArticlesContainer,
  },
})
export default class App extends Vue {}
</script>

<style lang='scss'>
html,
body {
  background-color: $secondary;
}
#app {
  font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary;
  background: $secondary;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #desktop-wrapper {
    text-align: center;
    color: $primary;
    background: $secondary;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
