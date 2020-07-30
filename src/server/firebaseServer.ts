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

  loadAllArticles(): void {
    articlesCollection.get().then(response => {
      const articleDtos: ArticleDTO[] = response.docs.map(doc => doc.data()) as ArticleDTO[];
      this._articles = articleDtos.map(this.buildArticleFromDto);
      bus.$emit("allArticlesFromServer", this._articles);
    });
  }

  post(article: Article): void {
    this._firebaseProxy
      .add(article)
      .then(docRef => {
        articlesCollection
          .doc(docRef.id)
          .get()
          .then(newArticle => {
            const articleData: ArticleDTO = {
              ...newArticle.data(),
            } as ArticleDTO;
            const aArticle: Article = this.buildArticleFromDto(articleData);
            this._articles.push(aArticle);
            bus.$emit("allArticlesFromServer", this._articles);
          });
        bus.$emit("clearArticleForm");
      })
      .catch(error => {
        console.error("Error adding article: ", error);
        bus.$emit("addNewArticleError");
      });
  }

  articleOpened(article: Article): void {
    if (process.env.VUE_APP_ENV === "develop") {
      return;
    }
    articlesCollection
      .where("url", "==", article.url)
      .get()
      .then(querySnapshot => {
        if (!firebase.auth().currentUser) {
          return;
        }
        querySnapshot.forEach(doc => {
          doc.ref
            .update({
              read: true,
              lastClicked: new Date(),
            })
            .then(() => {
              this.loadAllArticles();
            })
            .catch(error => {
              console.error("Error updating record. Are you sure you created the record?");
            });
        });
      })
      .catch(error => {
        console.error("Could not find record");
      });
  }

  signIn(user: User): void {
    this._firebaseProxy
      .signIn(user)
      .then(() => {
        bus.$emit("signInSuccess");
      })
      .catch(() => {
        bus.$emit("signInError");
      });
  }

  signOut(): void {
    this._firebaseProxy.signOut().then(() => {
      bus.$emit("signOutSuccess");
    });
  }
}
