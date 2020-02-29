<template>
    <form id='add-article-form'>
        <h2>New Article Record</h2>
        <div class='form-element'>
            <label for="article-title">Title</label>
            <input type="text" id="article-title" name="article-title">
        </div>
        <div class='form-element'>
            <label for="article-url">URL</label>
            <input type="text" id="article-url" name="article-url">
        </div>
        <div class='form-element'>
            <label for="has-been-read">Read</label>
            <input type="checkbox" id="has-been-read" name="has-been-read">
        </div>
        <div id='add-article-submit-container'>
            <button>Submit</button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'AddArticleForm',
};
</script>

<style lang='scss'>
#add-article-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .form-element {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;

        label {
            font-size: 24px;
        }

        input[type=text] {
            padding: 6px;
            border: 2px solid #ccc;
            border-radius: 4px;
            width: calc(100% - 8px);
            font-size: 20px;

            &:focus {
                border: 2px solid #42b983;
            }
        }
    }

    #add-article-submit-container {
        align-self: flex-end;

        button {
            padding: 8px;
            border-radius: 4px;

            &:hover {
                cursor: pointer;
            }
        }
    }
}

</style>
