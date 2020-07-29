<template>
  <div id="statistics-container" class="hide-small-screen">
    <h1>Reading Statistics</h1>
    <div class="gauge-container">
      <ProgressGauge :gaugeData="readTodayData" />
      <ProgressGauge :gaugeData="pastWeekData" />
      <ProgressGauge :gaugeData="pastMonthData" />
      <ProgressGauge :gaugeData="allTimeData" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ProgressGauge from "./ProgressGauge.vue";
import Article from "../types/article";
import GaugeData from "./GaugeData";

@Component({
  components: {
    ProgressGauge,
  },
})
export default class StatisticsContainer extends Vue {
  @Prop()
  articles!: Article[];

  get allTimeData(): GaugeData {
    return new GaugeData("All Time", this.readArticlesCount(this.articles), this.unreadArticlesCount(this.articles));
  }

  get pastMonthData(): GaugeData {
    const secondsDate = this.getSecondsFromCurrentDateMinusDays(30);
    const pastMonthRecords = this.getArticlesCreatedAfterSeconds(secondsDate);
    return new GaugeData("Past Month", this.readArticlesCount(pastMonthRecords), this.unreadArticlesCount(pastMonthRecords));
  }

  get pastWeekData(): GaugeData {
    const secondsDate = this.getSecondsFromCurrentDateMinusDays(7);
    const pastWeekRecords = this.getArticlesCreatedAfterSeconds(secondsDate);
    return new GaugeData("Past Week", this.readArticlesCount(pastWeekRecords), this.unreadArticlesCount(pastWeekRecords));
  }

  get readTodayData(): GaugeData {
    const secondsDate = this.getStartOfTodaySeconds();
    const pastDayRecords = this.getArticlesLastClickedAfterSeconds(secondsDate);
    const readToday = this.readArticlesCount(pastDayRecords) > 0;
    return new GaugeData("Read Today", this.readArticlesCount(pastDayRecords), this.unreadArticlesCount(pastDayRecords));
  }

  readArticlesCount(articles: Article[]): number {
    return articles.filter(article => article.read).length;
  }

  unreadArticlesCount(articles: Article[]): number {
    return articles.filter(article => !article.read).length;
  }

  getStartOfTodaySeconds(): number {
    const today = new Date();
    const priorDateMilli = today.setHours(0, 0, 0, 0);
    return Math.floor(priorDateMilli / 1000);
  }

  getSecondsFromCurrentDateMinusDays(days: number): number {
    const today = new Date();
    const priorDateMilli = new Date().setDate(today.getDate() - days);
    return Math.floor(priorDateMilli / 1000);
  }

  getArticlesCreatedAfterSeconds(seconds: number): Article[] {
    return this.articles.filter(article => article.createdAt > seconds);
  }

  getArticlesLastClickedAfterSeconds(seconds: number): Article[] {
    return this.articles.filter(article => article.lastClicked > seconds);
  }
}
</script>

<style lang='scss'>
#statistics-container {
  margin-top: 16px;

  .gauge-container {
    display: flex;
    justify-content: space-around;
  }
}
</style>
