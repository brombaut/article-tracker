<script>
import { bus } from '@/main';
import firebase from 'firebase';
import { articlesCollection } from '@/utils/firebase';


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        bus.$emit('signInSuccess');
    } else {
        bus.$emit('signOutSuccess');
    }
});
export default {
    name: 'ServerCommunication',
    render() {
        return null;
    },
    data() {
        return {
            articles: [],
        };
    },
    methods: {
        getAllTrackedArticleRecords() {
            bus.$emit('allArticlesFromServer', this.articles);
        },
        postNewArticleRecord(article) {
            firebase.firestore().collection('articles').add({
                ...article,
                createdAt: new Date(),
                lastClicked: new Date(),
            })
                .then((docRef) => {
                    articlesCollection.doc(docRef.id).get().then(newArticle => {
                        this.articles.push({ ...newArticle.data() });
                        bus.$emit('allArticlesFromServer', this.articles);
                    });
                    bus.$emit('clearArticleForm');
                })
                .catch((error) => {
                    console.error('Error adding article: ', error);
                    bus.$emit('addNewArticleError');
                });
        },
        handleArticleOpened(clickedArticle) {
            articlesCollection.where('url', '==', clickedArticle.url).get()
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
                            console.error('Error updating record. Are you sure you created the record?');
                        });
                    });
                })
                .catch((error) => {
                    console.error('Could not find record');
                });
        },
        loadAllArticleRecordsFromServer() {
            articlesCollection.get().then(response => {
                this.articles = response.docs.map(doc => doc.data());
                bus.$emit('allArticlesFromServer', this.articles);
            });
        },
        handleAttemptUserSignIn(user) {
            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then(data => {
                    bus.$emit('signInSuccess');
                })
                .catch(err => {
                    bus.$emit('signInError');
                });
        },
        handleAttemptUserSignOut() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    bus.$emit('signOutSuccess');
                });
        },
        handleRandomUnreadArticleRequest() {
            const unreadArticles = this.articles.filter(article => !article.read);
            const randomIndex = Math.floor(Math.random() * unreadArticles.length);
            bus.$emit('randomUnreadArticleEmit', unreadArticles[randomIndex]);
        },
    },
    mounted() {
        bus.$on('addArticleFormSubmitted', this.postNewArticleRecord);
        bus.$on('articleClicked', this.handleArticleOpened);
        bus.$on('attemptUserSignIn', this.handleAttemptUserSignIn);
        bus.$on('attemptUserSignOut', this.handleAttemptUserSignOut);
        bus.$on('forceArticleReload', this.loadAllArticleRecordsFromServer);
        bus.$on('randomUnreadArticleRequest', this.handleRandomUnreadArticleRequest);
        this.loadAllArticleRecordsFromServer();
    },
};
</script>
