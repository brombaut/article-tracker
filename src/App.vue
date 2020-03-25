<template>
  <div id="app">
    <MainHeader />
    <ArticlesContainer />

    <ServerCommunication />
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
};
</script>

<style lang='scss'>
html,
body {
    background-color: $secondary;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $primary;
    background: $secondary;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
