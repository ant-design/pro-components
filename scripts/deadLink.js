const { webkit } = require('playwright');
const got = require('got');
const { writeFileSync, readFileSync } = require('fs');

let g_page = null;

const deadLinkList = [];

const urlMap = new Map();
let browser = null; // Or 'firefox' or 'webkit'.

JSON.parse(readFileSync('./url.json').toString()).forEach((item) => {
  urlMap.set(item.url, item.isDead);
  if (item.isDead) {
    deadLinkList.push(item);
  }
});
/**
 * 生成 Page 对象
 */
const initPage = async () => {
  g_page = await browser.newPage();
  return g_page;
};

const findALlLink = async (pageUrl) => {
  const page = await initPage();
  await page.goto(pageUrl);

  const linkList = await page.evaluate(() => {
    return Array.from(document.body.querySelectorAll('a')).map((e) => {
      return { url: e.href.split('#').at(0).split('?').at(0), text: e?.textContent?.trim() };
    });
  });
  return linkList;
};

const checkIsDeadLink = async (link) => {
  try {
    const res = await got.get(link);
    if (res.statusCode !== 200) {
      console.log(res.statusCode);
    }
    return res.statusCode !== 200;
  } catch (error) {
    return true;
  }
};

const check = async (url) => {
  const host = new URL(url).host;
  const list = await findALlLink(url);
  for await (const urlItem of list) {
    if (urlItem.url.includes('https') && !urlMap.has(urlItem.url)) {
      console.log(urlItem.url);
      const isDead = await checkIsDeadLink(urlItem.url);
      urlMap.set(urlItem.url, isDead ? urlItem.text : false);
      writeFile();
      if (isDead) {
        deadLinkList.push(urlItem);
      } else {
        if (urlItem.url.includes(host)) {
          await check(urlItem.url);
        }
      }
    }
  }
};

const writeFile = () => {
  const list = [];
  urlMap.forEach((value, key) => {
    list.push({
      url: key,
      isDead: value,
    });
  });
  writeFileSync(
    './url.json',
    JSON.stringify(
      list.sort((a, b) => a.url - b.url),
      null,
      2,
    ),
  );
};

(async () => {
  try {
    browser = await webkit.launch();
    await check('https://procomponents.ant.design');
    console.log('死链接链接', deadLinkList);
    browser.close();
  } catch (error) {
    writeFile();
  }
})();
