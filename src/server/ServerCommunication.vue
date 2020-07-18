<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { bus } from "@/main";
import firebase from "firebase";
import { articlesCollection } from "./firebase";
import Article from "../table/article";
import User from "./user";


firebase.auth().onAuthStateChanged(user => {
  if (user) {
    bus.$emit("signInSuccess");
  } else {
    bus.$emit("signOutSuccess");
  }
});

@Component
export default class ServerCommunication extends Vue {
  articles: Article[] = [];

  getAllTrackedArticleRecords(): void {
    bus.$emit("allArticlesFromServer", this.articles);
  }

  postNewArticleRecord(article: Article): void {
    firebase.firestore().collection("articles").add({
      ...article,
      createdAt: new Date(),
      lastClicked: new Date(),
    })
      .then((docRef) => {
        articlesCollection.doc(docRef.id).get().then(newArticle => {
          this.articles.push({ ...newArticle.data() });
          bus.$emit("allArticlesFromServer", this.articles);
        });
        bus.$emit("clearArticleForm");
      })
      .catch((error) => {
        console.error("Error adding article: ", error);
        bus.$emit("addNewArticleError");
      });
  }

  handleArticleOpened(clickedArticle: Article): void {
    if (process.env.VUE_APP_ENV === "develop") {
      return;
    }
    articlesCollection
      .where("url", "==", clickedArticle.url)
      .get()
      .then(querySnapshot => {
        if (!firebase.auth().currentUser) {
          return;
        }
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            read: true,
            lastClicked: new Date(),
          }).then(() => {
            this.loadAllArticleRecordsFromServer();
          }).catch((error) => {
            console.error("Error updating record. Are you sure you created the record?");
          });
        });
      })
      .catch((error) => {
        console.error("Could not find record");
      });
  }

  loadAllArticleRecordsFromServer(): void {
    articlesCollection.get().then(response => {
      this.articles = response.docs.map(doc => doc.data()) as Article[];
      bus.$emit("allArticlesFromServer", this.articles);
    });
  }

  handleAttemptUserSignIn(user: User): void {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        bus.$emit("signInSuccess");
      })
      .catch(err => {
        bus.$emit("signInError");
      });
  }

  handleAttemptUserSignOut(): void {
    firebase
      .auth()
      .signOut()
      .then(() => {
        bus.$emit("signOutSuccess");
      });
  }

  handleRandomUnreadArticleRequest(): void {
    const unreadArticles = this.articles.filter(article => !article.read);
    const randomIndex = Math.floor(Math.random() * unreadArticles.length);
    bus.$emit("randomUnreadArticleEmit", unreadArticles[randomIndex]);
  }

  mounted(): void {
    bus.$on("addArticleFormSubmitted", this.postNewArticleRecord);
    bus.$on("articleClicked", this.handleArticleOpened);
    bus.$on("attemptUserSignIn", this.handleAttemptUserSignIn);
    bus.$on("attemptUserSignOut", this.handleAttemptUserSignOut);
    bus.$on("forceArticleReload", this.loadAllArticleRecordsFromServer);
    bus.$on("randomUnreadArticleRequest", this.handleRandomUnreadArticleRequest);
    this.loadAllArticleRecordsFromServer();
  }
}
</script>
