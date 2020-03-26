<template>
    <div id='statistics-container'>
        <h1>Reading Statistics</h1>
        <div class="gauge-container">
            <ProgressGauge :gaugeData="pastWeekData"/>
            <ProgressGauge :gaugeData="pastMonthData"/>
            <ProgressGauge :gaugeData="allTimeData"/>
        </div>
    </div>
</template>

<script>
import ProgressGauge from '@/components/ProgressGauge.vue';

export default {
    name: 'StatisticsContainer',
    components: {
        ProgressGauge,
    },
    props: {
        articles: Array,
    },
    computed: {
        allTimeData() {
            return {
                title: 'All Time',
                primaryValue: this.readArticlesCount(this.articles),
                secondaryValue: this.unreadArticlesCount(this.articles),
            };
        },
        pastMonthData() {
            const secondsDate = this.getSecondsFromCurrentDateMinusDays(30);
            const pastMonthRecords = this.getArticlesCreatedAfterSeconds(secondsDate);
            return {
                title: 'Past Month',
                primaryValue: this.readArticlesCount(pastMonthRecords),
                secondaryValue: this.unreadArticlesCount(pastMonthRecords),
            };
        },
        pastWeekData() {
            const secondsDate = this.getSecondsFromCurrentDateMinusDays(7);
            const pastMonthRecords = this.getArticlesCreatedAfterSeconds(secondsDate);
            return {
                title: 'Past Week',
                primaryValue: this.readArticlesCount(pastMonthRecords),
                secondaryValue: this.unreadArticlesCount(pastMonthRecords),
            };
        },
    },
    methods: {
        readArticlesCount(articles) {
            return articles.filter(article => article.read).length;
        },
        unreadArticlesCount(articles) {
            return articles.filter(article => !article.read).length;
        },
        getSecondsFromCurrentDateMinusDays(days) {
            const today = new Date();
            const priorDateMilli = new Date().setDate(today.getDate() - days);
            return Math.floor(priorDateMilli / 1000);
        },
        getArticlesCreatedAfterSeconds(seconds) {
            return this.articles.filter(article => article.createdAt.seconds > seconds);
        },
    },
};
</script>

<style lang='scss'>
#statistics-container {
    margin: 16px 0;

    .gauge-container {
        display: flex;
        justify-content: space-around;
    }
}

</style>
