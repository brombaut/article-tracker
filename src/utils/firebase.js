import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyBwGQH3yqQ80aD3nk3RCwxKTFVFwJiTC3A',
    authDomain: 'article-tracker-a4029.firebaseapp.com',
    databaseURL: 'https://article-tracker-a4029.firebaseio.com',
    projectId: 'article-tracker-a4029',
    storageBucket: 'article-tracker-a4029.appspot.com',
    messagingSenderId: '931403853312',
    appId: '1:931403853312:web:31c3bd0c212544174872e5',
    measurementId: 'G-S6YFVFX83V',
};
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = app.firestore();
export const articlesCollection = db.collection('articles');

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyBwGQH3yqQ80aD3nk3RCwxKTFVFwJiTC3A",
//     authDomain: "article-tracker-a4029.firebaseapp.com",
//     databaseURL: "https://article-tracker-a4029.firebaseio.com",
//     projectId: "article-tracker-a4029",
//     storageBucket: "article-tracker-a4029.appspot.com",
//     messagingSenderId: "931403853312",
//     appId: "1:931403853312:web:31c3bd0c212544174872e5",
//     measurementId: "G-S6YFVFX83V"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>
