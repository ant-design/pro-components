import fs from 'fs';
import type { IApi } from 'dumi';
import { extractStyle } from '@ant-design/cssinjs';

const RoutesPlugin = (api: IApi) => {
  const ssrCssFileName = `ssr-${Date.now()}.css`;

  api.modifyExportHTMLFiles((files) =>
    files
      // exclude dynamic route path, to avoid deploy failed by `:id` directory
      .filter((f) => !f.path.includes(':'))
      // FIXME: workaround to make emotion support react 18 pipeableStream
      // ref: https://github.com/emotion-js/emotion/issues/2800#issuecomment-1221296308
      .map((file) => {
        let styles = '';

        // extract all emotion style tags from body
        file.content = file.content.replace(/<style data-emotion[\S\s]+?<\/style>/g, (s) => {
          styles += s;

          return '';
        });

        // insert emotion style tags to head
        file.content = file.content.replace('</head>', `${styles}</head>`);

        return file;
      }),
  );

  // add ssr css file to html
  api.modifyConfig((memo) => {
    memo.styles ??= [];
    memo.styles.push(`/${ssrCssFileName}`);
    return memo;
  });

  // generate ssr css file
  api.onBuildHtmlComplete(() => {
    // FIXME: This should not be empty @peachScript
    const styleCache = (global as any)?.styleCache;
    const styleText = styleCache ? extractStyle(styleCache) : '';
    const styleTextWithoutStyleTag = styleText
      .replace(/<style\s[^>]*>/g, '')
      .replace(/<\/style>/g, '');
    fs.writeFileSync(`./dist/${ssrCssFileName}`, styleTextWithoutStyleTag, 'utf8');
  });
};

export default RoutesPlugin;
