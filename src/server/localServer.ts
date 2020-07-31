import { bus } from "@/main";
import Article from "@/types/article";
import Server from "./server";
import User from "./user";
import DevDtoData from "./DevDtoData";
import ArticleDTO from "./articleDto";

export default class LocalServer extends Server {
  async loadAllArticles(): Promise<void> {
    this._articles = (DevDtoData as ArticleDTO[]).map(this.buildArticleFromDto);
    bus.$emit("allArticlesFromServer", this._articles);
  }

  async post(article: Article): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async articleOpened(article: Article): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async signIn(user: User): Promise<void> {
    bus.$emit("signInSuccess");
  }

  async signOut(): Promise<void> {
    bus.$emit("signOutSuccess");
  }
}
