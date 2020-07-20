<template>
  <div id="articles-container">
    <StatisticsContainer :articles="articles" />
    <ArticlesTable :rows="articlesToDisplay" :sortString="sortString" />
    <div class="pagination-controls">
      <div class="pagination-control" @click="setPaginationToStart()">
        <i class="material-icons">chevron_left</i>
        <i class="material-icons">chevron_left</i>
      </div>
      <div class="pagination-control" @click="decrementPagination()">
        <i class="material-icons">chevron_left</i>
      </div>
      <div class="page-numbers-container">
        <span class="page-sub-numbers-container">
          <span v-if="pagination.pageNumber > 2" class="page-sub-ellipse">...</span>
          <span
            v-if="pagination.pageNumber > 1"
            class="page-sub-number"
            @click="setPagination(pagination.pageNumber - 2)"
          >{{ pagination.pageNumber - 2 }}</span>
          <span
            v-if="pagination.pageNumber > 0"
            class="page-sub-number"
            @click="setPagination(pagination.pageNumber - 1)"
          >{{ pagination.pageNumber - 1 }}</span>
        </span>
        <span class="page-main-number">{{ pagination.pageNumber}}</span>
        <span class="page-sub-numbers-container">
          <span
            v-if="pagination.pageNumber < numberOfPaginationPages"
            class="page-sub-number"
            @click="setPagination(pagination.pageNumber + 1)"
          >{{ pagination.pageNumber + 1 }}</span>
          <span
            v-if="pagination.pageNumber < numberOfPaginationPages - 1"
            class="page-sub-number"
            @click="setPagination(pagination.pageNumber + 2)"
          >{{ pagination.pageNumber + 2 }}</span>
          <span
            v-if="pagination.pageNumber < numberOfPaginationPages - 2"
            class="page-sub-ellipse"
          >...</span>
        </span>
      </div>
      <div class="pagination-control" @click="incrementPagination()">
        <i class="material-icons">chevron_right</i>
      </div>
      <div class="pagination-control" @click="setPaginationToEnd()">
        <i class="material-icons">chevron_right</i>
        <i class="material-icons">chevron_right</i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { bus } from "@/main";
import ArticlesTable from "./ArticlesTable.vue";
import StatisticsContainer from "../statistics/StatisticsContainer.vue";
import SortType from "./sortType";
import Article from "./article";
import Filter from "./filter";

@Component({
  components: {
    ArticlesTable,
    StatisticsContainer,
  },
})
export default class ArticlesContainer extends Vue {
  articles: Article[] = [];

  filters: { [key: string]: string } = {
    created: "",
    lastClicked: "",
    title: "",
    url: "",
    read: "unread",
  };

  sort: SortType = {
    attribute: "created",
    type: "ascending",
  };

  pagination = {
    pageNumber: 0,
    recordsPerPage: 10,
  };

  get articlesToDisplay(): Article[] {
    let returnArray: Article[] = [...this.articles];
    returnArray = this.filterArray(returnArray);
    returnArray = this.sortArray(returnArray);
    returnArray = this.getArticlesForPaginationPage(returnArray);
    return returnArray;
  }

  get allArticlesToDisplay(): object[] {
    let returnArray = [...this.articles];
    returnArray = this.filterArray(returnArray);
    returnArray = this.sortArray(returnArray);
    return returnArray;
  }

  get sortString(): string {
    return `${this.sort.attribute}-${this.sort.type}`;
  }

  get numberOfPaginationPages(): number {
    const totalRecords = this.allArticlesToDisplay.length - 1;
    const lastPageNumber = Math.floor(totalRecords / this.pagination.recordsPerPage);
    return lastPageNumber;
  }

  get displayedArticlesLength(): number {
    return this.articlesToDisplay.length;
  }

  handleAllArticlesFromServer(allArticles: Article[]): void {
    this.articles = [...allArticles];
  }

  handleFilterUpdated(updatedFilterObject: Filter): void {
    this.filters[updatedFilterObject.type] = updatedFilterObject.value;
    this.pagination.pageNumber = 0;
  }

  handleSortUpdated(updateSortType: SortType): void {
    this.sort = { ...updateSortType };
  }

  convertSecondsEpochToDateFormatted(second: number): string {
    if (!second) {
      return "";
    }
    const date = new Date(0);
    date.setUTCSeconds(second);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  filterArray(array: Article[]): Article[] {
    if (this.filters.created) {
      array = array.filter(record => this.convertSecondsEpochToDateFormatted(record.createdAt).includes(
        this.filters.created.toString(),
      ));
    }
    if (this.filters.lastClicked) {
      array = array.filter(record => this.convertSecondsEpochToDateFormatted(record.lastClicked).includes(
        this.filters.lastClicked.toString(),
      ));
    }
    if (this.filters.title) {
      array = array.filter(record => record.title
        .toString()
        .toLowerCase()
        .includes(this.filters.title.toString().toLowerCase()));
    }
    if (this.filters.url) {
      array = array.filter(record => record.url
        .toString()
        .toLowerCase()
        .includes(this.filters.url.toString().toLowerCase()));
    }
    if (this.filters.read) {
      const readShouldBe = this.filters.read === "read";
      array = array.filter(record => record.read === readShouldBe);
    }
    return array;
  }

  sortArray(array: Article[]): Article[] {
    let endElementsArray: Article[] = [];
    let arrayToSort = [...array];
    if (this.sort.attribute === "minuteRead") {
      arrayToSort = array.filter(a => a.minuteRead);
      endElementsArray = array.filter(a => !a.minuteRead);
    }
    arrayToSort = arrayToSort.sort(this.sortByGeneralComparison);
    return [...arrayToSort, ...endElementsArray];
  }

  sortByGeneralComparison(a: Article, b: Article): number {
    return a.compareTo(b, this.sort.attribute, this.sort.type);
  }

  getArticlesForPaginationPage(array: Article[]): Article[] {
    const startIndex = this.pagination.pageNumber * this.pagination.recordsPerPage;
    const endIndex = this.pagination.pageNumber * this.pagination.recordsPerPage + this.pagination.recordsPerPage;
    return array.slice(startIndex, endIndex);
  }

  incrementPagination(): void {
    const currentLastIndexDisplayed = this.pagination.pageNumber * this.pagination.recordsPerPage + this.pagination.recordsPerPage;
    if (currentLastIndexDisplayed > this.allArticlesToDisplay.length) {
      return;
    }
    this.pagination.pageNumber += 1;
  }

  decrementPagination(): void {
    const currentLastIndexDisplayed = this.pagination.pageNumber * this.pagination.recordsPerPage + this.pagination.recordsPerPage;
    if (this.pagination.pageNumber <= 0) {
      return;
    }
    this.pagination.pageNumber -= 1;
  }

  setPaginationToStart(): void {
    this.pagination.pageNumber = 0;
  }

  setPaginationToEnd(): void {
    this.pagination.pageNumber = this.numberOfPaginationPages;
  }

  setPagination(index: number): void {
    this.pagination.pageNumber = index;
  }

  mounted(): void {
    bus.$on("allArticlesFromServer", this.handleAllArticlesFromServer);
    bus.$on("filterUpdated", this.handleFilterUpdated);
    bus.$on("sortUpdated", this.handleSortUpdated);
    bus.$emit("forceArticleReload");
  }
}
</script>

<style lang='scss'>
#articles-container {
  max-width: 100%;
  margin-top: 80px;

  @media only screen and (max-width: 500px) {
    width: 100vw;
  }

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

    @media only screen and (max-width: 500px) {
      .pagination-control {
        width: 10px;
        i {
          font-size: 2rem;
          width: 8px;
        }
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

        .page-sub-ellipse {
          font-size: 12px;
          color: $primaryLighter;
          margin: 0 8px;
        }
      }

      .page-main-number {
        margin: 0 8px;
      }
    }

    @media only screen and (max-width: 500px) {
      .page-numbers-container {
        font-size: 1rem;
      }
    }
  }
}
</style>
