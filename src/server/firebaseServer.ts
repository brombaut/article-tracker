import Article from "@/types/article";
import firebase from "firebase";
import { bus } from "@/main";
import Server from "./server";
import User from "./user";
import { articlesCollection } from "./firebase";
import ArticleDTO from "./articleDto";
import FirebaseProxy from "./firebaseProxy";

export default class FirebaseServer extends Server {
  private _firebaseProxy: FirebaseProxy;

  constructor() {
    super();
    this._firebaseProxy = new FirebaseProxy();
  }

  async loadAllArticles(): Promise<void> {
    const response = await articlesCollection.get();
    const articleDtos: ArticleDTO[] = response.docs.map(doc => doc.data()) as ArticleDTO[];
    this._articles = articleDtos.map(this.buildArticleFromDto);
    bus.$emit("allArticlesFromServer", this._articles);
  }

  async post(article: Article): Promise<void> {
    const docRef = await this._firebaseProxy.add(article);
    const newArticle = await articlesCollection.doc(docRef.id).get();
    const articleData: ArticleDTO = {
      ...newArticle.data(),
    } as ArticleDTO;
    const aArticle: Article = this.buildArticleFromDto(articleData);
    this._articles.push(aArticle);
    bus.$emit("allArticlesFromServer", this._articles);
    bus.$emit("clearArticleForm");
  }

  async articleOpened(article: Article): Promise<void> {
    if (process.env.VUE_APP_ENV === "develop") {
      return;
    }
    if (!firebase.auth().currentUser) {
      return;
    }
    const querySnapshot = await articlesCollection.where("url", "==", article.url).get();
    querySnapshot.forEach(async doc => {
      await doc.ref.update({ read: true, lastClicked: new Date() });
      this.loadAllArticles();
    });
  }

  async signIn(user: User): Promise<void> {
    try {
      await this._firebaseProxy.signIn(user);
      bus.$emit("signInSuccess");
    } catch {
      bus.$emit("signInError");
    }
  }

  async signOut(): Promise<void> {
    await this._firebaseProxy.signOut();
    bus.$emit("signOutSuccess");
  }
}
