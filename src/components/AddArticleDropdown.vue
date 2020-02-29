<template>
    <div id='add-article-dropdown'>
        <button class="dropbtn border-left">
            <!-- TODO: Arrow down icon -->
            Add Article
        </button>
        <div class="dropdown-content">
            <AddArticleForm />
        </div>
    </div>
</template>

<script>
import AddArticleForm from '@/components/AddArticleForm.vue';

export default {
    name: 'AddArticleDropdown',
    components: {
        AddArticleForm,
    },
};
</script>

<style lang='scss'>
#add-article-dropdown {
    position: relative;
    display: inline-block;
    border-left: 1px solid white;

    button {
        background-color: #42b983;
        color: white;
        padding: 0px 16px;
        font-size: 24px;
        font-weight: 600;
        border: none;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 200px;
        transition: 0.3s;

        &:hover {
            background-color: #56c291;
        }
    }

    .dropdown-content {
        display: none;
        position: absolute;
        right: 0;
        width: 800px;
        padding-top: 20px;
        padding-bottom: 60px;
        padding-left: 40px;
        padding-right: 40px;
        background-color: #e1fcf1;
        color: #34495e;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    &:hover {
        .dropdown-content {
            display: block;
        }
        .dropbtn {
            background-color: #56c291;
        }
    }

}

</style>
