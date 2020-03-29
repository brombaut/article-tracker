import axios from 'axios';

const cheerio = require('cheerio');

const corsPrefix = 'https://cors-anywhere.herokuapp.com/';

function buildArticleInformationFromHtml(html) {
    let articleTitle = null;
    let minuteRead = null;
    const $ = buildHtmlTree(html);
    try {
        articleTitle = $('#main-title').find('h1').text().trim();
    } catch {
        console.error('Could not parse article title string');
    }
    try {
        const minuteReadString = $('#main-title').find('h3').find('.published-at').text();
        [minuteRead] = minuteReadString.match(/\d+/g).map(Number);
    } catch {
        console.error('Could not parse minute read string');
    }
    return Promise.resolve({
        articleTitle,
        minuteRead,
    });
}

function buildHtmlTree(htmlString) {
    return cheerio.load(htmlString);
}

export default {
    scrapeArticleInformation(articleUrl) {
        const url = `${corsPrefix}${articleUrl}`;
        return axios.get(url).then(response => {
            if (response.status !== 200) {
                const rejectObject = {
                    code: response.status,
                    message: 'Could not get article from url',
                };
                return Promise.reject(rejectObject);
            }
            return buildArticleInformationFromHtml(response.data);
        });
    },
};
