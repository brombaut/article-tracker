<template>
  <div id='articles-container'>
      <h1>
          Article Records
      </h1>
      <ArticlesTable
        :rows="articlesToDisplay"
        :sortString="sortString" />
  </div>
</template>

<script>
import { bus } from '@/main';
import ArticlesTable from '@/components/ArticlesTable.vue';

export default {
    name: 'ArticlesContainer',
    components: {
        ArticlesTable,
    },
    data() {
        return {
            articles: [],
            filters: {
                id: '',
                title: '',
                url: '',
            },
            sort: {
                attribute: 'id',
                type: 'descending',
            },
        };
    },
    computed: {
        articlesToDisplay() {
            let returnArray = [...this.articles];
            if (this.filters.id) {
                returnArray = returnArray.filter(record => record.id.toString().includes(this.filters.id.toString()));
            }
            if (this.filters.title) {
                returnArray = returnArray.filter(record => record.title.toString().toLowerCase().includes(this.filters.title.toString().toLowerCase()));
            }
            if (this.filters.url) {
                returnArray = returnArray.filter(record => record.url.toString().toLowerCase().includes(this.filters.url.toString().toLowerCase()));
            }
            returnArray = returnArray.sort((a, b) => {
                if (this.sort.type === 'ascending') {
                    if (a[this.sort.attribute] >= b[this.sort.attribute]) {
                        return 1;
                    }
                    return -1;
                }
                if (a[this.sort.attribute] < b[this.sort.attribute]) {
                    return 1;
                }
                return -1;
            });
            return returnArray;
        },
        sortString() {
            return `${this.sort.attribute}-${this.sort.type}`;
        },
    },
    methods: {
        handleAllArticlesFromServer(allArticles) {
            this.articles = [...allArticles];
        },
        handleFilterUpdated(updatedFilterObject) {
            this.filters[updatedFilterObject.type] = updatedFilterObject.value;
        },
        handleSortUpdated(updateSortType) {
            this.sort = { ...updateSortType };
        },
    },
    mounted() {
        bus.$on('allArticlesFromServer', this.handleAllArticlesFromServer);
        bus.$on('filterUpdated', this.handleFilterUpdated);
        bus.$on('sortUpdated', this.handleSortUpdated);
    },
};
</script>

<style lang='scss'>
#articles-container {
    width: 100%;
    max-width: 1200px;
}

</style>
