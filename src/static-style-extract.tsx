import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import type React from 'react';
import { renderToString } from 'react-dom/server';

/**
 * Render a representative component tree and collect its static CSS.
 * Use the same theme and prefix settings as the application, with
 * `zeroRuntime` disabled while extracting.
 */
export function extractProStyle(node: React.ReactElement): string {
  const cache = createCache();
  renderToString(<StyleProvider cache={cache}>{node}</StyleProvider>);
  return extractStyle(cache, { plain: true });
}
