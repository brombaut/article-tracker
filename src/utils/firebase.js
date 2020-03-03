import * as firebase from 'firebase';
import firebaseConf from './firebaseConf.config';

const firebaseConfig = firebaseConf;

const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = app.firestore();
export const articlesCollection = db.collection('articles');
