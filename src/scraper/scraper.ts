import axios from "axios";

// const cheerio = require("cheerio");
import * as cheerio from "cheerio";

interface Tag {
  name: string;
  href: string;
  color: string;
  backgroundColor: string;
}

const devToBaseUrl = "https://dev.to";
const corsPrefix = "https://cors-anywhere.herokuapp.com/";

function buildArticleInformationFromHtml(html: string): any {
  const $: CheerioStatic = buildHtmlTree(html);
  const mainTitleNode: Cheerio = selectMainTitleNode($);
  const articleTitle: string = scrapeArticleTItle($, mainTitleNode);
  const minuteRead: number = scrapeMinuteRead($, mainTitleNode);
  const tags = scrapeTags($, mainTitleNode);
  return Promise.resolve({
    articleTitle,
    minuteRead,
    tags,
  });
}

function buildHtmlTree(html: string): CheerioStatic {
  return cheerio.load(html);
}

function selectMainTitleNode($: CheerioStatic): Cheerio {
  return $("#main-title");
}

function scrapeArticleTItle($: CheerioStatic, mainTitleNode: Cheerio): string {
  let articleTitle = null;
  try {
    articleTitle = $(mainTitleNode).find("h1").text().trim();
  } catch {
    console.error("Could not parse article title string");
  }
  return articleTitle || "";
}

function scrapeMinuteRead($: CheerioStatic, mainTitleNode: Cheerio): number {
  let minuteRead = 0;
  try {
    const timeSiblings: Cheerio = $(mainTitleNode).find("time").siblings();
    timeSiblings.each((i, node) => {
      const nodeText: string = $(node).text();
      if (nodeText.includes("min read")) {
        [minuteRead] = (nodeText.match(/\d+/g) || ["0"]).map(Number);
      }
    });
  } catch (e) {
    console.error(e);
  }
  return minuteRead;
}

function scrapeTags($: CheerioStatic, mainTitleNode: Cheerio): Tag[] {
  const tags: Tag[] = [];
  try {
    const tagNodes: Cheerio = $(mainTitleNode).find(".spec__tags").find("a");
    tagNodes.each((i, node: CheerioElement) => {
      const name: string = $(node).text();
      const href = `${devToBaseUrl}${$(node).attr("href")}`;
      const stylesString: string = $(node).attr("style") || "";
      const stylesArray: string[] = stylesString.split(";");
      let color = "";
      let backgroundColor = "";
      stylesArray.forEach((styleString: string) => {
        const [name, value] = styleString.split(":");
        if (name === "color") {
          color = value;
        }
        if (name === "background-color") {
          backgroundColor = value;
        }
      });
      const tagObject: Tag = {
        name,
        href,
        color,
        backgroundColor,
      };
      tags.push(tagObject);
    });
  } catch {
    console.error("Could not scrape tags data");
  }
  return tags;
}

export default {
  scrapeArticleInformation(articleUrl: string): Promise<any> {
    const url = `${corsPrefix}${articleUrl}`;
    return axios.get(url).then(response => {
      if (response.status !== 200) {
        const rejectObject = {
          code: response.status,
          message: "Could not get article from url",
        };
        return Promise.reject(rejectObject);
      }
      return buildArticleInformationFromHtml(response.data);
    });
  },
};
