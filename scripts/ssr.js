const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const waitTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const distPath = path.join(__dirname, '../', 'dist');

app.use(express.static(distPath));

const serve = app.listen(port, () => {
  console.log(`服务启动中 ${port}`);
});

const filterList = (filePath) => {
  if (filePath.startsWith('404')) {
    return false;
  }
  if (fs.statSync(path.join(distPath, filePath)).isDirectory()) {
    return true;
  }
  if (filePath.endsWith('.html')) return true;
  return false;
};

const mapHtmlMap = (filePath) => {
  if (fs.statSync(path.join(distPath, filePath)).isDirectory()) {
    const dirList = path.join(distPath, filePath);
    const htmlList = fs
      .readdirSync(dirList)
      .map((itemPath) => path.join(filePath, itemPath))
      .flat(1)
      .map(mapHtmlMap)
      .flat(1)
      .filter(filterList);
    return htmlList;
  }
  return filePath;
};

const list = fs
  .readdirSync(distPath)
  .filter(filterList)
  .map((filePath) => {
    if (fs.statSync(path.join(distPath, filePath)).isDirectory()) {
      const dirList = path.join(distPath, filePath);
      const htmlList = fs
        .readdirSync(dirList)
        .map((itemPath) => path.join(filePath, itemPath))
        .map(mapHtmlMap)
        .flat(1)
        .sort()
        .filter(filterList);
      return htmlList;
    }
    return filePath;
  })
  .flat(1)
  .sort();

const loop = async () => {
  // 启动浏览器
  const browser = await puppeteer.launch({
    // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
    // headless: false,
    timeout: 30000, // 默认超时为30秒，设置为0则表示不设置超时
  });

  // 打开空白页面
  const page = await browser.newPage();
  await page.setViewport({
    width: 1800,
    height: 1000,
  });

  for await (htmlPage of list) {
    await page.goto(`http://localhost:3000/${htmlPage.replace('index.html', '')}`);
    const scrollHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    });
    console.log('执行' + htmlPage + '页面!');
    await page.setViewport({
      width: 1800,
      height: scrollHeight,
    });
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    const html = await page.evaluate(() => {
      return document.getElementsByTagName('html')[0].innerHTML;
    });
    if (htmlPage.startsWith('components')) {
      await waitTime(3000);
    }
    if (htmlPage.endsWith('.html')) {
      fs.writeFileSync(path.join(distPath, htmlPage), html);
    } else {
      fs.writeFileSync(path.join(distPath, htmlPage, 'index.html'), html);
    }
  }

  await browser.close();
  await serve.close();
};
try {
  loop();
} catch (error) {}
