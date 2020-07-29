import Article from "@/types/article";
import { bus } from "@/main";
import User from "./user";

export default abstract class Server {
  protected _articles: Article[];

  constructor() {
    this._articles = [];
    bus.$on("addArticleFormSubmitted", this.post);
    bus.$on("articleClicked", this.articleOpened);
    bus.$on("attemptUserSignIn", this.signIn);
    bus.$on("attemptUserSignOut", this.signOut);
    bus.$on("forceArticleReload", this.loadAllArticles);
    bus.$on("randomUnreadArticleRequest", this.randomArticle);
    this.loadAllArticles();
  }

  getAll(): void {
    bus.$emit("allArticlesFromServer", this._articles);
  }

  abstract loadAllArticles(): void;

  abstract post(article: Article): void;

  abstract articleOpened(article: Article): void;

  abstract signIn(user: User): void;

  abstract signOut(): void;

  abstract randomArticle(): void;
}
