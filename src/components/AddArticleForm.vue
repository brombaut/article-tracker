<template>
    <form id='add-article-form' autocomplete="off">
        <h2>New Article Record</h2>
        <div class='form-element'>
            <label for="article-title">Title:</label>
            <input
                type="text"
                id="article-title"
                name="article-title"
                v-model="articleTitle">
        </div>
        <div class='form-element'>
            <label for="article-url">URL:</label>
            <input
                type="text"
                id="article-url"
                name="article-url"
                v-model="articleUrl">
        </div>
        <div class='form-element'>
            <div id='add-article-read-container'>
                <label for="has-been-read">
                    <input
                        type="checkbox"
                        id="has-been-read"
                        name="has-been-read"
                        v-model="articleRead">
                    <span>Read</span>
                </label>
            </div>
        </div>
        <div id='add-article-submit-container'>
            <button
                id='add-article-submit-button'
                @click="handleSubmit">
                <div
                    class="lds-dual-ring"
                    v-if="isSubmitting">
                </div>
                <span v-else>Submit</span>
            </button>
        </div>
        <div v-if="showOnlyBenMessage" id='only-ben-message'>
            <span>Only Ben can add articles to his reading list</span>
        </div>
    </form>
</template>

<script>
import { bus } from '@/main';
import alreadyReadArticles from '@/utils/alreadyReadArticles';

export default {
    name: 'AddArticleForm',
    data() {
        return {
            articleTitle: '',
            articleUrl: '',
            articleRead: false,
            isSubmitting: false,
            showOnlyBenMessage: false,
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            let stop = false;
            const titleInput = document.querySelector('#article-title');
            const urlInput = document.querySelector('#article-url');
            if (!this.articleTitle) {
                stop = true;
                titleInput.classList.add('red-border');
            } else {
                titleInput.classList.remove('red-border');
            }
            if (!this.articleUrl) {
                stop = true;
                urlInput.classList.add('red-border');
            } else {
                urlInput.classList.remove('red-border');
            }
            if (stop) {
                return;
            }
            this.setIsSubmitting();
            const article = {
                title: this.articleTitle,
                url: this.articleUrl,
                read: this.articleRead,
            };
            bus.$emit('addArticleFormSubmitted', article);
        },
        setIsSubmitting() {
            this.isSubmitting = true;
            document.querySelector('#article-title').disabled = true;
            document.querySelector('#article-url').disabled = true;
            document.querySelector('#has-been-read').disabled = true;
            document.querySelector('#add-article-submit-button').disabled = true;
        },
        resetForm() {
            this.isSubmitting = false;
            this.articleTitle = '';
            this.articleUrl = '';
            this.articleRead = false;
            document.querySelector('#article-title').disabled = false;
            document.querySelector('#article-url').disabled = false;
            document.querySelector('#has-been-read').disabled = false;
            document.querySelector('#add-article-submit-button').disabled = false;
        },
        submitRealArticle() {
            const { articles } = alreadyReadArticles;
            for (let i = 0; i < articles.length; i++) {
                setTimeout(() => {
                    bus.$emit('addArticleFormSubmitted', articles[i]);
                }, i * 1000);
            }
        },
        submitNotReadArticles() {
            const { notReadArticles } = alreadyReadArticles;
            for (let i = 0; i < notReadArticles.length; i++) {
                setTimeout(() => {
                    bus.$emit('addArticleFormSubmitted', notReadArticles[i]);
                }, i * 1000);
            }
        },
        setShowOnlyBenMessage(val) {
            this.showOnlyBenMessage = val;
        },
        handleNotBenError() {
            this.setShowOnlyBenMessage(true);
            this.isSubmitting = false;
            document.querySelector('#article-title').disabled = false;
            document.querySelector('#article-url').disabled = false;
            document.querySelector('#has-been-read').disabled = false;
            document.querySelector('#add-article-submit-button').disabled = false;
            setTimeout(() => this.setShowOnlyBenMessage(false), 5000);
        },
    },
    mounted() {
        bus.$on('clearArticleForm', this.resetForm);
        bus.$on('addNewArticleError', this.handleNotBenError);
    },
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
            border: 2px solid $primary;
            border-radius: 4px;
            width: calc(100% - 8px);
            font-size: 20px;

            &:focus {
                border: 2px solid $primary;
            }
        }

        .red-border {
            border: 2px solid #b94242 !important;
        }

        #add-article-read-container {
            margin: 4px;
            background-color: #EFEFEF;
            border-radius: 4px;
            border: 1px solid #D0D0D0;
            transition: 0.3s;

            &:hover {
                cursor: pointer;
                background: #a0ffd4;
            }

            label {
                &:hover {
                    cursor: pointer;
                }

                span {
                    text-align: center;
                    padding: 12px 18px;;
                    display: block;
                    transition: 0.3s;
                }

                input {
                    display: none
                }
            }


            input:checked + span {
                background-color: $primary;
                color: #fff;
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

            span {
                padding: 7px 0;
            }

            .lds-dual-ring {
                display: inline-block;
            }

            .lds-dual-ring:after {
                content: " ";
                display: block;
                width: 20px;
                height: 20px;
                margin: 8px;
                border-radius: 50%;
                border: 3px solid #fff;
                border-color: #fff transparent #fff transparent;
                animation: lds-dual-ring 1.2s linear infinite;
            }
            @keyframes lds-dual-ring {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }
    }
}

</style>
