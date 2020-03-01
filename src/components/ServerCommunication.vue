<script>
import { bus } from '@/main';
// import firebase from 'firebase';
import { articlesCollection } from '@/utils/firebase';


// firebase.auth().onAuthStateChanged(user => {
//     console.log('Firebase user: ', user);
// });
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
            articlesCollection.add({
                ...article,
                createdAt: new Date(),
                lastClicked: new Date(),
            }).then((docRef) => {
                articlesCollection.doc(docRef.id).get().then(newArticle => {
                    this.articles.push({ ...newArticle.data() });
                    bus.$emit('allArticlesFromServer', this.articles);
                });
                bus.$emit('clearArticleForm');
            }).catch((error) => {
                // TODO: Handle failed call
                console.error('Error adding article: ', error);
            });
        },
        handleArticleOpened(clickedArticle) {
            this.articles.find(article => article.id === clickedArticle.id).read = true;
        },
    },
    mounted() {
        bus.$on('addArticleFormSubmitted', this.postNewArticleRecord);
        bus.$on('articleClicked', this.handleArticleOpened);
        this.getAllTrackedArticleRecords();
        articlesCollection.get().then(response => {
            this.articles = response.docs.map(doc => doc.data());
            bus.$emit('allArticlesFromServer', this.articles);
        });
    },
};
</script>
