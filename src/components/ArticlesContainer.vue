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
                created: '',
                title: '',
                url: '',
            },
            sort: {
                attribute: 'created',
                type: 'descending',
            },
        };
    },
    computed: {
        articlesToDisplay() {
            let returnArray = [...this.articles];
            if (this.filters.created) {
                returnArray = returnArray.filter(record => this.convertSecondsEpochToDateFormatted(record.createdAt.seconds).includes(this.filters.created.toString()));
            }
            if (this.filters.title) {
                returnArray = returnArray.filter(record => record.title.toString().toLowerCase().includes(this.filters.title.toString().toLowerCase()));
            }
            if (this.filters.url) {
                returnArray = returnArray.filter(record => record.url.toString().toLowerCase().includes(this.filters.url.toString().toLowerCase()));
            }
            returnArray = returnArray.sort((a, b) => {
                if (this.sort.attribute === 'created') {
                    if (this.sort.type === 'ascending') {
                        if (a.createdAt.seconds >= b.createdAt.seconds) {
                            return 1;
                        }
                        return -1;
                    }
                    if (a.createdAt.seconds < b.createdAt.seconds) {
                        return 1;
                    }
                    return -1;
                }
                if (this.sort.type === 'ascending') {
                    if (this.sort.attribute === 'created') {
                        if (a.createdAt.seconds >= b.createdAt.seconds) {
                            return 1;
                        }
                        return -1;
                    }
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
        convertSecondsEpochToDateFormatted(second) {
            if (!second) {
                return '';
            }
            const date = new Date(0);
            date.setUTCSeconds(second);
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
    max-width: 100%;
    margin-top: 80px;
}

</style>
