<template>
    <header>
        <img class="radar-logo" src="@/assets/radar.png"/>
        <h1>BEC Article Tracker</h1>
        <div class="expand"></div>
        <div class="actions-container">
            <AddArticleDropdown />
        </div>
    </header>
</template>

<script>
import AddArticleDropdown from '@/components/AddArticleDropdown.vue';

export default {
    name: 'MainHeader',
    components: {
        AddArticleDropdown,
    },
};
</script>

<style lang='scss'>

header {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0;
    background-color: #42b983;
    color: white;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 99;

    .radar-logo {
        height: 60px;
        width: 60px;
        margin: 0 16px;
    }

    h3 {
        margin: 8px 0px;
    }

    .expand{
        flex: 1;
    }

    .actions-container {
        height: 100%;
        display: flex;
    }
}

</style>
