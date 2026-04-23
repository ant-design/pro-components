import path from 'path';

import type { IApi } from 'umi';

/**
 * 文档站：将 site/theme 下的 Less 作为入口样式引入（走 Less 管线），
 * 勿使用 .dumirc `styles` 传入整文件内容（会被当成外链 href）。
 */
export default function siteDumiPlugin(api: IApi) {
  api.addEntryImports(() => {
    return [
      {
        source: path.join(
          api.paths.cwd,
          'site/theme/markdownExternalLink.less',
        ),
      },
      {
        source: path.join(
          api.paths.cwd,
          'site/theme/otkAgenticBubbleListReset.less',
        ),
      },
    ];
  });
}
