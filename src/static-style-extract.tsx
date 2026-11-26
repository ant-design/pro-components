import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import type { ThemeConfig } from 'antd';
import { ConfigProvider } from 'antd';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ProConfigProvider } from './provider';
import type { ProStyleRender } from './static-style-components';
import { proStyleRenderers } from './static-style-components';

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

const PRO_LAYER_PREFIX = '@layer antd-pro{';

function unwrapProLayer(css: string): string {
  const trimmed = css.trim();
  if (trimmed.startsWith(PRO_LAYER_PREFIX) && trimmed.endsWith('}')) {
    return trimmed.slice(PRO_LAYER_PREFIX.length, -1);
  }
  return css;
}

/** Extract only styles registered by Pro's useStyle, including their effects. */
function extractRegisteredProStyle(
  cache: ReturnType<typeof createCache>,
  plain: boolean,
  layer: boolean,
): string {
  const effectStyles: Record<string, boolean> = {};
  const effectCss: string[] = [];
  const css = Array.from(cache.cache.entries())
    .filter(([key]) => key.startsWith('style%'))
    .sort(([, first], [, second]) => {
      const orderDiff = (first[1]?.[4] ?? 0) - (second[1]?.[4] ?? 0);
      return orderDiff || first[0] - second[0];
    })
    .flatMap(([, value]) => {
      const [styleStr, styleId, effectStyle, clientOnly, order] =
        value[1] || [];
      if (clientOnly || !styleStr?.startsWith('@layer antd-pro')) return [];
      const outputStyle = layer ? styleStr : unwrapProLayer(styleStr);
      Object.entries(effectStyle || {}).forEach(([effectKey, effect]) => {
        if (effectStyles[effectKey]) return;
        effectStyles[effectKey] = true;
        const rawEffect = String(effect);
        effectCss.push(layer ? rawEffect : unwrapProLayer(rawEffect));
      });
      if (plain) return [outputStyle];
      const attrs = `data-rc-order="prependQueue" data-rc-priority="${order}" data-css-hash="${styleId}"`;
      const effects = effectCss.map(
        (effect) => `<style ${attrs}>${effect}</style>`,
      );
      effectCss.length = 0;
      return [...effects, `<style ${attrs}>${outputStyle}</style>`];
    })
    .join('');
  return css + effectCss.join('');
}

export type ExtractAllProStyleOptions = {
  /** Only render these manifest keys. Defaults to all built-in components. */
  includes?: string[];
  /** Skip these manifest keys after applying includes. */
  excludes?: string[];
  /** antd theme; cssVar defaults to the class prefix and zeroRuntime is disabled. */
  customTheme?: ThemeConfig;
  /** Class prefix and default CSS variable prefix. Defaults to `ant`. */
  prefixCls?: string;
  /** Override a built-in renderer or append application-specific style states. */
  customizeRender?: Record<string, ProStyleRender | null>;
  /** Wrap the prepared tree in an additional application provider. */
  wrap?: (node: React.ReactElement) => React.ReactElement;
  /** Return CSS only by default; pass false for cssinjs style elements. */
  plain?: boolean;
  /** Wrap extracted rules in `@layer antd-pro`. Defaults to `false` to match `antd/dist/antd.css`. */
  layer?: boolean;
};

/** Names of the built-in SSR-safe component/style fixtures. */
export const proStyleComponentNames = Object.freeze(
  Object.keys(proStyleRenderers),
);

/**
 * Render ProComponents' built-in component manifest and collect its static CSS.
 * The caller's production zeroRuntime setting can remain enabled: this isolated
 * extraction tree temporarily disables it while preserving the rest of the theme.
 */
export function extractAllProStyle(
  options: ExtractAllProStyleOptions = {},
): string {
  const {
    includes,
    excludes = [],
    customTheme = {},
    prefixCls = 'ant',
    customizeRender = {},
    wrap = (node) => node,
    plain = true,
    layer = false,
  } = options;
  const includesSet = includes ? new Set(includes) : undefined;
  const excludesSet = new Set(excludes);
  const unknownNames = [...(includes ?? []), ...excludes].filter(
    (name) => !(name in proStyleRenderers) && !(name in customizeRender),
  );
  if (unknownNames.length) {
    throw new Error(
      `Unknown Pro style component(s): ${unknownNames.join(', ')}. ` +
        'Use customizeRender for application-specific entries.',
    );
  }
  const renderers = { ...proStyleRenderers, ...customizeRender };
  const nodes = Object.entries(renderers).flatMap(([name, render]) => {
    if (
      !render ||
      (includesSet && !includesSet.has(name)) ||
      excludesSet.has(name)
    ) {
      return [];
    }
    return [<React.Fragment key={name}>{render()}</React.Fragment>];
  });
  const tree = wrap(
    <ConfigProvider
      prefixCls={prefixCls}
      theme={{
        hashed: false,
        ...customTheme,
        cssVar: customTheme.cssVar ?? { prefix: prefixCls },
        zeroRuntime: false,
      }}
    >
      <ProConfigProvider>{nodes}</ProConfigProvider>
    </ConfigProvider>,
  );
  const cache = createCache();
  renderToString(
    <StyleProvider cache={cache} layer>
      {tree}
    </StyleProvider>,
  );
  return extractRegisteredProStyle(cache, plain, layer);
}
