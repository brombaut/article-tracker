<template>
  <form id="add-article-form" autocomplete="off">
    <h2>New Article Record</h2>
    <p>For dev.to articles, just enter the URL, and I'll scrape the article's 'Title' and 'Minute Read' fields.</p>
    <div class="form-element">
      <label for="article-url">URL:</label>
      <input type="text" id="article-url" name="article-url" v-model="articleUrl" />
    </div>
    <div class="form-element">
      <label for="article-title">Title:</label>
      <input type="text" id="article-title" name="article-title" v-model="articleTitle" />
    </div>
    <div class="form-element">
      <div id="add-article-read-container">
        <label for="has-been-read">
          <input type="checkbox" id="has-been-read" name="has-been-read" v-model="articleRead" />
          <span>Read</span>
        </label>
      </div>
    </div>
    <div id="add-article-submit-container">
      <button id="add-article-submit-button" @click="handleSubmit">
        <div class="lds-dual-ring" v-if="isSubmitting"></div>
        <span v-else>Submit</span>
      </button>
    </div>
    <div v-if="showOnlyBenMessage" id="only-ben-message">
      <span>Only Ben can add articles to his reading list</span>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { bus } from "@/main";
import scraper from "../scraper/scraper";

@Component
export default class AddArticleForm extends Vue {
  articleTitle = "";

  articleUrl = "";

  articleRead = false;

  isSubmitting = false;

  showOnlyBenMessage = false;

  get urlInput(): HTMLInputElement {
    return document.querySelector("#article-url") as HTMLInputElement;
  }

  get titleInput(): HTMLInputElement {
    return document.querySelector("#article-title") as HTMLInputElement;
  }

  get hasBeenReadInput(): HTMLInputElement {
    return document.querySelector("#has-been-read") as HTMLInputElement;
  }

  get submitButton(): HTMLButtonElement {
    return document.querySelector("#add-article-submit-button") as HTMLButtonElement;
  }

  handleSubmit(e: Event): void {
    e.preventDefault();
    this.setIsSubmitting();
    let stop = false;
    stop = this.validateUrl();
    if (stop) {
      this.setIsNotSubmitting();
      return;
    }
    if (!this.articleTitle) {
      this.attemptArticleInformationScrape();
      return;
    }

    stop = this.validateTitle();
    if (stop) {
      this.setIsNotSubmitting();
      return;
    }
    this.setIsSubmitting();
    const article = {
      title: this.articleTitle,
      url: this.articleUrl,
      read: this.articleRead,
      minuteRead: null,
      tags: [],
    };
    bus.$emit("addArticleFormSubmitted", article);
  }

  attemptArticleInformationScrape(): void {
    scraper.scrapeArticleInformation(this.articleUrl).then(scrapedArticleInfo => {
      this.articleTitle = scrapedArticleInfo.articleTitle;
      this.validateTitle();
      if (!scrapedArticleInfo.articleTitle) {
        this.setIsNotSubmitting();
        return;
      }
      const article = {
        title: this.articleTitle,
        url: this.articleUrl,
        read: this.articleRead,
        minuteRead: scrapedArticleInfo.minuteRead,
        tags: scrapedArticleInfo.tags,
      };
      bus.$emit("addArticleFormSubmitted", article);
    });
  }

  validateUrl(): boolean {
    if (!this.articleUrl) {
      this.urlInput.classList.add("red-border");
      return true;
    }
    this.urlInput.classList.remove("red-border");
    return false;
  }

  validateTitle(): boolean {
    if (!this.articleTitle) {
      this.titleInput.classList.add("red-border");
      return true;
    }
    this.titleInput.classList.remove("red-border");
    return false;
  }

  setIsSubmitting(): void {
    this.isSubmitting = true;
    this.titleInput.disabled = true;
    this.urlInput.disabled = true;
    this.hasBeenReadInput.disabled = true;
    this.submitButton.disabled = true;
  }

  setIsNotSubmitting(): void {
    this.isSubmitting = false;
    this.titleInput.disabled = false;
    this.urlInput.disabled = false;
    this.hasBeenReadInput.disabled = false;
    this.submitButton.disabled = false;
  }

  resetForm(): void {
    this.isSubmitting = false;
    this.articleTitle = "";
    this.articleUrl = "";
    this.articleRead = false;
    this.titleInput.disabled = false;
    this.urlInput.disabled = false;
    this.hasBeenReadInput.disabled = false;
    this.submitButton.disabled = false;
  }

  setShowOnlyBenMessage(val: boolean): void {
    this.showOnlyBenMessage = val;
  }

  handleNotBenError(): void {
    this.setShowOnlyBenMessage(true);
    this.isSubmitting = false;
    this.titleInput.disabled = false;
    this.urlInput.disabled = false;
    this.hasBeenReadInput.disabled = false;
    this.submitButton.disabled = false;
    setTimeout(() => this.setShowOnlyBenMessage(false), 5000);
  }

  mounted(): void {
    bus.$on("clearArticleForm", this.resetForm);
    bus.$on("addNewArticleError", this.handleNotBenError);
  }
}
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

    input[type="text"] {
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
      background-color: #efefef;
      border-radius: 4px;
      border: 1px solid #d0d0d0;
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
          padding: 12px 18px;
          display: block;
          transition: 0.3s;
        }

        input {
          display: none;
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
        background: $primaryBrighter;
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
        border: 3px solid $secondary;
        border-color: $secondary transparent $secondary transparent;
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
