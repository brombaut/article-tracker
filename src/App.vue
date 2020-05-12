<template>
  <div id="app">
    <span
      v-show="screenIsTooSmall"
      id="mobile-coming-soon">
      Mobile version not available
    </span>
    <span
      id="desktop-wrapper"
      v-show="!screenIsTooSmall">
      <MainHeader />
      <ArticlesContainer />
      <ServerCommunication />
    </span>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue';
import ServerCommunication from '@/components/ServerCommunication.vue';
import ArticlesContainer from '@/components/ArticlesContainer.vue';


export default {
    name: 'App',
    components: {
        MainHeader,
        ServerCommunication,
        ArticlesContainer,
    },
    data() {
        return {
            screenIsTooSmall: false,
        };
    },
    methods: {
        handleWindowResize() {
            this.screenIsTooSmall = window.innerWidth < 1300;
        },
    },
    mounted() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    },
};
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

  #mobile-coming-soon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 3rem;
    height: 100%;
  }

}
</style>
