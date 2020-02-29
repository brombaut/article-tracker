<template>
  <div>
  </div>
</template>

<script>
import { bus } from '@/main';

export default {
    name: 'ArticlesContainer',
    data() {
        return {
            articles: [],
        };
    },
    methods: {
        handleAllArticlesFromServer(allArticles) {
            console.log(allArticles);
            this.articles = [...allArticles];
        },
    },
    mounted() {
        bus.$on('allArticlesFromServer', this.handleAllArticlesFromServer);
    },
};
</script>

<style>

</style>
