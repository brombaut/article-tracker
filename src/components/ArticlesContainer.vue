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
                lastClicked: '',
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
            returnArray = this.filterArray(returnArray);
            returnArray = this.sortArray(returnArray);
            return returnArray;
        },
        sortString() {
            return `${this.sort.attribute}-${this.sort.type}`;
        },
    },
    methods: {
        handleAllArticlesFromServer(allArticles) {
            this.articles = [...allArticles];
            console.log(this.articles);
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
        filterArray(array) {
            if (this.filters.created) {
                array = array.filter(record => this.convertSecondsEpochToDateFormatted(record.createdAt.seconds).includes(this.filters.created.toString()));
            }
            if (this.filters.lastClicked) {
                array = array.filter(record => this.convertSecondsEpochToDateFormatted(record.lastClicked.seconds).includes(this.filters.lastClicked.toString()));
            }
            if (this.filters.title) {
                array = array.filter(record => record.title.toString().toLowerCase().includes(this.filters.title.toString().toLowerCase()));
            }
            if (this.filters.url) {
                array = array.filter(record => record.url.toString().toLowerCase().includes(this.filters.url.toString().toLowerCase()));
            }
            return array;
        },
        sortArray(array) {
            let sortFunction = this.sortByGeneralComparison;
            if (this.sort.attribute === 'created') {
                sortFunction = this.sortBySecondsAttribute('createdAt');
            }
            if (this.sort.attribute === 'lastClicked') {
                sortFunction = this.sortBySecondsAttribute('lastClicked');
            }
            return array.sort(sortFunction);
        },
        sortByGeneralComparison(a, b) {
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
        },
        sortBySecondsAttribute(attribute) {
            return (a, b) => {
                if (this.sort.type === 'ascending') {
                    if (a[attribute].seconds >= b[attribute].seconds) {
                        return 1;
                    }
                    return -1;
                }
                if (a[attribute].seconds < b[attribute].seconds) {
                    return 1;
                }
                return -1;
            };
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
