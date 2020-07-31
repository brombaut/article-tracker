<template>
  <div id="app">
    <span id="desktop-wrapper">
      <MainHeader />
      <ArticlesContainer />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainHeader from "./header/MainHeader.vue";
import ArticlesContainer from "./table/ArticlesContainer.vue";
import Server from "./server/server";
import FirebaseServer from "./server/firebaseServer";
import LocalServer from "./server/localServer";

@Component({
  components: {
    MainHeader,
    ArticlesContainer,
  },
})
export default class App extends Vue {
  private _server: Server | null = null;

  mounted(): void {
    if (process.env.VUE_APP_ENV === "develop") {
      // this._server = new LocalServer();
      this._server = new FirebaseServer();
    } else {
      this._server = new FirebaseServer();
    }
  }
}
</script>

<style lang="scss">
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
