import Article from "@/types/article";
import { bus } from "@/main";
import User from "./user";
import ArticleDTO from "./articleDto";

export default abstract class Server {
  protected _articles: Article[];

  constructor() {
    this._articles = [];
    this.setListeners();
    this.loadAllArticles();
  }

  setListeners(): void {
    bus.$on("addArticleFormSubmitted", (article: Article) => this.post(article));
    bus.$on("articleClicked", (article: Article) => this.articleOpened(article));
    bus.$on("attemptUserSignIn", (user: User) => this.signIn(user));
    bus.$on("attemptUserSignOut", () => this.signOut());
    bus.$on("forceArticleReload", () => this.loadAllArticles());
    bus.$on("randomUnreadArticleRequest", () => this.randomArticle());
  }

  getAll(): void {
    bus.$emit("allArticlesFromServer", this._articles);
  }

  protected buildArticleFromDto(adto: ArticleDTO): Article {
    return new Article(adto.createdAt, adto.lastClicked, adto.title, adto.minuteRead, adto.tags, adto.url, adto.read);
  }

  abstract loadAllArticles(): void;

  abstract post(article: Article): void;

  abstract articleOpened(article: Article): void;

  abstract signIn(user: User): void;

  abstract signOut(): void;

  randomArticle(): void {
    const unreadArticles = this._articles.filter(article => !article.read);
    const randomIndex = Math.floor(Math.random() * unreadArticles.length);
    bus.$emit("randomUnreadArticleEmit", unreadArticles[randomIndex]);
  }
}
