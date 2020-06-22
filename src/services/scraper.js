import axios from 'axios';

const cheerio = require('cheerio');

const devToBaseUrl = 'https://dev.to';
const corsPrefix = 'https://cors-anywhere.herokuapp.com/';

function buildArticleInformationFromHtml(html) {
  const $ = buildHtmlTree(html);
  const mainTitleNode = selectMainTitleNode($);
  const articleTitle = scrapeArticleTItle($, mainTitleNode);
  const minuteRead = scrapeMinuteRead($, mainTitleNode);
  const tags = scrapeTags($, mainTitleNode);
  return Promise.resolve({
    articleTitle,
    minuteRead,
    tags,
  });
}

function buildHtmlTree(htmlString) {
  return cheerio.load(htmlString);
}

function selectMainTitleNode($) {
  return $('#main-title');
}

function scrapeArticleTItle($, mainTitleNode) {
  let articleTitle = null;
  try {
    articleTitle = $(mainTitleNode).find('h1').text().trim();
  } catch {
    console.error('Could not parse article title string');
  }
  return articleTitle;
}

function scrapeMinuteRead($, mainTitleNode) {
  let minuteRead = null;
  try {
    const minuteReadString = $(mainTitleNode).find('time').next().text(); // Get next sibling
    [minuteRead] = minuteReadString.match(/\d+/g).map(Number);
  } catch {
    console.error('Could not parse minute read string');
  }
  return minuteRead;
}

function scrapeTags($, mainTitleNode) {
  const tags = [];
  try {
    const tagNodes = $(mainTitleNode).find('.spec__tags').find('a');
    tagNodes.each((i, node) => {
      const name = $(node).text();
      const href = `${devToBaseUrl}${$(node).attr('href')}`;
      const stylesString = $(node).attr('style');
      const stylesArray = stylesString.split(';');
      let color = null;
      let backgroundColor = null;
      stylesArray.forEach(styleString => {
        const [name, value] = styleString.split(':');
        if (name === 'color') {
          color = value;
        }
        if (name === 'background-color') {
          backgroundColor = value;
        }
      });
      const tagObject = {
        name,
        href,
        color,
        backgroundColor,
      };
      tags.push(tagObject);
    });
  } catch {
    console.error('Could not scrape tags data');
  }
  return tags;
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
