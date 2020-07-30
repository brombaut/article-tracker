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

  add(article: Article): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {
    return firebase
      .firestore()
      .collection("articles")
      .add({ ...article, createdAt: new Date(), lastClicked: new Date() });
  }

  signIn(user: User): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  }

  signOut(): Promise<void> {
    return firebase.auth().signOut();
  }
}
