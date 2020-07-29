import firebase from "firebase";
import { bus } from "@/main";
import Article from "@/types/article";
import { articlesCollection } from "./firebase";
import User from "./user";

export default class FirebaseProxy {
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        bus.$emit("signInSuccess");
      } else {
        bus.$emit("signOutSuccess");
      }
    });
  }

  async add(article: Article): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {
    return firebase
      .firestore()
      .collection("articles")
      .add({ ...article, createdAt: new Date(), lastClicked: new Date() });
  }

  async signIn(user: User): Promise<void> {
    await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }

  async signOut(): Promise<void> {
    await firebase.auth().signOut();
  }
}
