<template>
    <div id='articles-container'>
        <StatisticsContainer :articles="articles"/>
        <ArticlesTable
            :rows="articlesToDisplay"
            :sortString="sortString" />
        <div class='pagination-controls'>
            <div
                class='pagination-control'
                @click="setPaginationToStart()">
                <i class="material-icons">chevron_left</i>
                <i class="material-icons">chevron_left</i>
            </div>
            <div
                class='pagination-control'
                @click="decrementPagination()">
                <i class="material-icons">chevron_left</i>
            </div>
            <div class='page-numbers-container'>
                <span class="page-sub-numbers-container">
                    <span
                        v-if="pagination.pageNumber > 1"
                        class="page-sub-number"
                        @click="setPagination(pagination.pageNumber - 2)">
                        {{ pagination.pageNumber - 2 }}
                    </span>
                    <span
                        v-if="pagination.pageNumber > 0"
                        class="page-sub-number"
                        @click="setPagination(pagination.pageNumber - 1)">
                        {{ pagination.pageNumber - 1 }}
                    </span>
                </span>
                <span class="page-main-number">
                    {{ pagination.pageNumber}}
                </span>
                <span class="page-sub-numbers-container">
                    <span
                        v-if="pagination.pageNumber < numberOfPaginationPages"
                        class="page-sub-number"
                        @click="setPagination(pagination.pageNumber + 1)">
                        {{ pagination.pageNumber + 1 }}
                    </span>
                    <span
                        v-if="pagination.pageNumber < numberOfPaginationPages - 1"
                        class="page-sub-number"
                        @click="setPagination(pagination.pageNumber + 2)">
                        {{ pagination.pageNumber + 2 }}
                    </span>
                </span>
            </div>
            <div
                class='pagination-control'
                @click="incrementPagination()">
                <i class="material-icons">chevron_right</i>
            </div>
            <div
                class='pagination-control'
                @click="setPaginationToEnd()">
                <i class="material-icons">chevron_right</i>
                <i class="material-icons">chevron_right</i>
            </div>
        </div>
    </div>
</template>

<script>
import { bus } from '@/main';
import ArticlesTable from '@/components/ArticlesTable.vue';
import StatisticsContainer from '@/components/StatisticsContainer.vue';

export default {
    name: 'ArticlesContainer',
    components: {
        ArticlesTable,
        StatisticsContainer,
    },
    data() {
        return {
            articles: [],
            filters: {
                created: '',
                lastClicked: '',
                title: '',
                url: '',
                read: '',
            },
            sort: {
                attribute: 'created',
                type: 'descending',
            },
            pagination: {
                pageNumber: 0,
                recordsPerPage: 10,
            },
        };
    },
    computed: {
        articlesToDisplay() {
            let returnArray = [...this.articles];
            returnArray = this.filterArray(returnArray);
            returnArray = this.sortArray(returnArray);
            returnArray = this.getArticlesForPaginationPage(returnArray);
            return returnArray;
        },
        allArticlesToDisplay() {
            let returnArray = [...this.articles];
            returnArray = this.filterArray(returnArray);
            returnArray = this.sortArray(returnArray);
            return returnArray;
        },
        sortString() {
            return `${this.sort.attribute}-${this.sort.type}`;
        },
        numberOfPaginationPages() {
            const totalRecords = this.allArticlesToDisplay.length - 1;
            const lastPageNumber = Math.floor(totalRecords / this.pagination.recordsPerPage);
            return lastPageNumber;
        },
        displayedArticlesLength() {
            return this.articlesToDisplay.length;
        },
    },
    methods: {
        handleAllArticlesFromServer(allArticles) {
            this.articles = [...allArticles];
        },
        handleFilterUpdated(updatedFilterObject) {
            this.filters[updatedFilterObject.type] = updatedFilterObject.value;
            this.pagination.pageNumber = 0;
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
            if (this.filters.read) {
                const readShouldBe = this.filters.read === 'read';
                array = array.filter(record => record.read === readShouldBe);
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
        getArticlesForPaginationPage(array) {
            const startIndex = this.pagination.pageNumber * this.pagination.recordsPerPage;
            const endIndex = (this.pagination.pageNumber * this.pagination.recordsPerPage) + this.pagination.recordsPerPage;
            return array.slice(startIndex, endIndex);
        },
        incrementPagination() {
            const currentLastIndexDisplayed = this.pagination.pageNumber * this.pagination.recordsPerPage + this.pagination.recordsPerPage;
            if (currentLastIndexDisplayed > this.allArticlesToDisplay.length) {
                return;
            }
            this.pagination.pageNumber += 1;
        },
        decrementPagination() {
            const currentLastIndexDisplayed = this.pagination.pageNumber * this.pagination.recordsPerPage + this.pagination.recordsPerPage;
            if (this.pagination.pageNumber <= 0) {
                return;
            }
            this.pagination.pageNumber -= 1;
        },
        setPaginationToStart() {
            this.pagination.pageNumber = 0;
        },
        setPaginationToEnd() {
            this.pagination.pageNumber = this.numberOfPaginationPages;
        },
        setPagination(index) {
            this.pagination.pageNumber = index;
        },
    },
    mounted() {
        bus.$on('allArticlesFromServer', this.handleAllArticlesFromServer);
        bus.$on('filterUpdated', this.handleFilterUpdated);
        bus.$on('sortUpdated', this.handleSortUpdated);
        bus.$emit('forceArticleReload');
    },
};
</script>

<style lang='scss'>
#articles-container {
    max-width: 100%;
    margin-top: 80px;

    .pagination-controls {
        padding: 8px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid $secondaryBrightest;
        margin-bottom: 16px;

        .pagination-control {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 44px;
            margin: 0 8px;
            user-select: none;

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 12px;
                font-size: 44px;
            }

            &:hover {
                cursor: pointer;
                color: $primaryBrightest;
            }
        }

        .page-numbers-container {
            height: 100%;
            font-size: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;

            .page-sub-numbers-container {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 80px;

                .page-sub-number {
                    font-size: 12px;
                    color: $primaryLighter;
                    margin: 0 8px;

                    &:hover {
                        cursor: pointer;
                        color: $primaryBrightest;
                    }
                }
            }

            .page-main-number {
                margin: 0 8px;
            }
        }
    }
}

</style>
