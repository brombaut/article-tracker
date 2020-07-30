import { bus } from "@/main";
import Article from "@/types/article";
import Server from "./server";
import User from "./user";
import DevDtoData from "./DevDtoData";
import ArticleDTO from "./articleDto";

export default class LocalServer extends Server {
  loadAllArticles(): void {
    this._articles = (DevDtoData as ArticleDTO[]).map(this.buildArticleFromDto);
    bus.$emit("allArticlesFromServer", this._articles);
  }

  post(article: Article): void {
    throw new Error("Method not implemented.");
  }

  articleOpened(article: Article): void {
    throw new Error("Method not implemented.");
  }

  signIn(user: User): void {
    bus.$emit("signInSuccess");
  }

  signOut(): void {
    bus.$emit("signOutSuccess");
  }
}
