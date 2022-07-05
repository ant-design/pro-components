const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const cheerio = require('cheerio');
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

const mdList = glob.sync(path.join(path.join(__dirname, '../', 'packages'), '**/*.md'), {
  ignore: ['**/node_modules/**', '**/README.md', '**/CHANGELOG.md'],
});

const loopHtmlAst = (ast, fn) => {
  if (!Array.isArray(ast) && Array.isArray(ast.children)) {
    ast.children.map((child) => {
      if (child.type === 'html') {
        fn(child);
      }
      loopHtmlAst(child, fn);
    });
  }
};

const filterList = (filePath) => {
  if (filePath.startsWith('_') || filePath.startsWith('~') || filePath.startsWith('.')) {
    return false;
  }
  if (filePath.endsWith('en-US') || filePath.endsWith('changelog') || filePath.startsWith('404')) {
    return false;
  }
  if (fs.statSync(path.join(distPath, filePath)).isDirectory()) {
    return true;
  }
  if (filePath.endsWith('.html')) return true;
  return false;
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
    width: 1500,
    height: 80000,
  });

  let pathObject = {};

  for await (htmlPage of list) {
    await page.goto(`http://localhost:3000/${htmlPage}`);
    const scrollHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    });

    await page.setViewport({
      width: 1500,
      height: scrollHeight,
    });
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await waitTime(2000);
    const demoList = await page.evaluate(() => {
      const list = [];
      for (let letter of document.querySelectorAll('.__dumi-default-previewer').values()) {
        const title = letter
          .querySelector('.__dumi-default-previewer-desc')
          ?.getAttribute('data-title');

        list.push({
          width: letter.querySelector('.__dumi-default-previewer-demo')?.clientWidth,
          height: letter.querySelector('.__dumi-default-previewer-demo')?.clientHeight,
          title,
        });
      }
      return list;
    });
    if (demoList.length > 0) {
      pathObject[htmlPage] = demoList;
    }
  }
  Object.keys(pathObject).map(async (htmlPath) => {
    let fileContent = '';
    let filePath = '';
    if (htmlPath.startsWith('playground')) {
      filePath = path.join(__dirname, '../', 'docs', htmlPath + '.playground.md');
    }
    if (htmlPath.startsWith('components')) {
      filePath = mdList.find((item) => item.includes(`${htmlPath.split('/').pop()}.md`));
      if (!filePath) {
        filePath = mdList.find((item) =>
          item.includes(
            `${htmlPath
              .split('/')
              .pop()
              .split('-')
              .map((item) => item.replace(/^\S/, (s) => s.toUpperCase()))
              .join('')}/index.md`,
          ),
        );
      }
    }
    if (filePath) {
      fileContent = fs.readFileSync(filePath, 'utf8');
    }

    const demoList = pathObject[htmlPath];
    let i = 0;

    fileContent.match(new RegExp(/<code(?:(?!\/>).|\n)*?\/>/gm, 'g'))?.map((node) => {
      const $ = cheerio.load(node);
      if (node.includes('debug')) return;
      if ($('code').attr('debug')) {
        return;
      }
      if (!demoList[i]) {
        console.log(i, demoList[i], node);
      }
      if (demoList[i] && $('code').attr('iframe')) {
        $('code').attr('iframe', parseInt(demoList[i].height + 1) + 'px');
      }

      if (demoList[i] && !$('code').attr('iframe')) {
        $('code').attr('height', parseInt(demoList[i].height + 1) + 'px');
      }
      i++;
      fileContent = fileContent.replace(
        node,
        $.html('code').replace('></code>', '/>').replace('debug=""', 'debug'),
      );
    });

    filePath && fs.writeFileSync(filePath, fileContent);
  });
  await browser.close();
  await serve.close();
};
try {
  loop();
  console.log(mdList);
} catch (error) {}
