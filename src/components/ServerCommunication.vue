<script>
import { bus } from '@/main';

export default {
    name: 'ServerCommunication',
    render() {
        return null;
    },
    data() {
        return {
            articles: [
                {
                    title: 'Using the Local Storage',
                    url: 'https://dev.to/sarah_chima/using-the-local-storage-fn8?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email',
                    read: false,
                },
                {
                    title: 'Saving Data in JavaScript without a Database',
                    url: 'https://dev.to/healeycodes/saving-data-in-javascript-without-a-database-22n?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email',
                    read: false,
                },
                {
                    title: 'If Javascript Is Single Threaded, How Is It Asynchronous?',
                    url: 'https://dev.to/steelvoltage/if-javascript-is-single-threaded-how-is-it-asynchronous-56gd?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email',
                    read: false,
                },
                {
                    title: 'How to Learn - What most schools don’t teach',
                    url: 'https://dev.to/theghostyced/how-to-learn-what-most-schools-don-t-teach-2p5f?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email',
                    read: false,
                },
            ],
        };
    },
    methods: {
        getAllTrackedArticleRecords() {
            bus.$emit('allArticlesFromServer', this.articles);
        },
        postNewArticleRecord(article) {
            this.articles.push(article);
        },
    },
    mounted() {
        bus.$on('addArticleFormSubmitted', this.postNewArticleRecord);
        this.getAllTrackedArticleRecords();
    },
};
</script>
