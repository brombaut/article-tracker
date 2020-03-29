<template>
  <div id='random-article-button'>
        <button @click="handleRandomArticleClicked()">
            <i
                class="material-icons"
                style="font-size:32px">
                open_in_new
            </i>
            I'm Feeling Lucky
        </button>
    </div>
</template>

<script>
import { bus } from '@/main';

export default {
    name: 'RandomArticleButton',
    methods: {
        handleRandomArticleClicked() {
            bus.$emit('randomUnreadArticleRequest');
        },
        openRandomArticle(unreadArticleRecord) {
            console.log('Random Article: ', unreadArticleRecord);
            window.open(unreadArticleRecord.url, '_blank').focus();
            bus.$emit('articleClicked', unreadArticleRecord);
        },
    },
    mounted() {
        bus.$on('randomUnreadArticleEmit', this.openRandomArticle);
    },
};
</script>

<style lang='scss'>
#random-article-button {
    border-left: 1px solid $secondary;

    button {
        background-color: $primary;
        color: $secondary;
        padding: 0px 24px;
        font-size: 24px;
        font-weight: 600;
        border: none;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        min-width: 200px;
        transition: 0.3s;

        i {
            transition: 0.4s;
            margin-right: 8px;
        }

        &:hover {
            background-color: $primaryLighter;
            cursor: pointer;
        }
    }
}
</style>
