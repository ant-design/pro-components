import type { TooltipProps } from 'antd';
import { Typography } from 'antd';
import isObject from 'lodash-es/isObject';
import React from 'react';

export type ProEllipsisTooltip = {
  showTitle?: boolean;
  tooltip?: TooltipProps;
};

export type ProEllipsis = ProEllipsisTooltip | boolean;

const isNeedTranText = (item: any): boolean => {
  if (item?.valueType?.toString().startsWith('date')) {
    return true;
  }
  if (item?.valueType === 'select' || item?.valueEnum) {
    return true;
  }
  return false;
};

/**
 * 判断是否可走 antd Table 原生 CSS 省略：
 * 仅当 ellipsis 为纯 true（无 tooltip/showTitle 定制）且未开启 copyable 时，
 * 由 antd column 的 ellipsis 属性完成省略，避免为每个单元格包 Typography.Text。
 * 注意：仅适用于 Table 场景（antd column 支持 ellipsis 透传）；
 * Descriptions 等无原生省略能力的场景仍需 Typography 渲染。
 */
export const canUseNativeEllipsis = (item: any): boolean =>
  item?.ellipsis === true && !item?.copyable;

const getEllipsis = (item: any): ProEllipsisTooltip | boolean => {
  if (item.ellipsis?.showTitle === false) {
    return false;
  }
  return item.ellipsis;
};

const normalizeCopyText = (text: unknown) => {
  // Avoid copying non-string values and trim end to prevent trailing spaces.
  // (e.g. some browsers may include Typography's copy separator whitespace)
  return text === null || text === undefined ? '' : String(text).trimEnd();
};

const isReactElement = (value: unknown): value is React.ReactElement =>
  React.isValidElement(value);

const genEllipsis = (
  dom: React.ReactNode,
  item: any,
  text: string,
  rawText: unknown,
) => {
  const ellipsis = getEllipsis(item);
  if (!ellipsis) {
    return false;
  }
  /** 有些 valueType 需要设置copy的为string */
  const needTranText = isNeedTranText(item);

  // renderText 返回 React 元素时，使用 dom 作为 tooltip 避免 [object Object]
  const isRenderTextReturningJsx = isReactElement(rawText);

  // 支持一下 tooltip 的关闭，合并 ellipsis.tooltip 自定义属性（placement 等）
  if ((needTranText || isRenderTextReturningJsx) && item?.tooltip !== false) {
    const tooltipTitle = <div className="pro-table-tooltip-text">{dom}</div>;
    if (isObject(ellipsis) && isObject(ellipsis.tooltip)) {
      return {
        tooltip: {
          title: tooltipTitle,
          ...ellipsis.tooltip,
        },
      };
    }
    return {
      tooltip: tooltipTitle,
    };
  }

  if (!text) {
    return false;
  }

  // 如果 ellipsis 是对象且包含 tooltip 属性,合并 tooltip 的属性
  if (isObject(ellipsis) && isObject(ellipsis.tooltip)) {
    return {
      tooltip: {
        title: text,
        ...ellipsis.tooltip,
      },
    };
  }
  return {
    tooltip: text,
  };
};

/**
 * 生成 Copyable 或 Ellipsis 的 dom
 *
 * @param dom 渲染后的 DOM 节点
 * @param item 列配置
 * @param text renderText 的返回值，可能是 string/number 或 React 元素
 * @param copyText 用于复制的原始文本，当 renderText 返回 JSX 时避免复制 [object Object]
 * @param enableNativeEllipsis 是否启用原生 CSS 省略（仅 Table 场景，antd column 会透传 ellipsis）
 */
export const genCopyable = (
  dom: React.ReactNode,
  item: any,
  text: string | React.ReactNode,
  copyText?: unknown,
  enableNativeEllipsis?: boolean,
) => {
  if (!item.copyable && !item.ellipsis) return dom;

  // 纯 ellipsis: true 且无 copyable 时走 antd Table 原生省略，不再包 Typography.Text
  if (enableNativeEllipsis && canUseNativeEllipsis(item)) return dom;

  const normalizedText = normalizeCopyText(text);
  // renderText 返回 JSX 时使用原始文本避免复制 [object Object]
  const resolvedCopyText =
    copyText !== undefined ? normalizeCopyText(copyText) : normalizedText;
  const ellipsis = genEllipsis(dom, item, normalizedText, text);

  // `Typography.Text` with `copyable` will render an internal separator whitespace
  // between text and icon. When users "multi-click to select all" in a table cell,
  // that whitespace can be selected and copied, causing pasted text to end with spaces.
  // Render the copy icon in a separate node to keep the selectable text clean.
  if (item.copyable) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          maxWidth: '100%',
        }}
      >
        <Typography.Text
          style={{
            flex: 1,
            minWidth: 0,
            margin: 0,
            padding: 0,
          }}
          title=""
          ellipsis={ellipsis}
        >
          {dom}
        </Typography.Text>
        {resolvedCopyText ? (
          <span style={{ flex: 'none', userSelect: 'none' }}>
            <Typography.Text
              style={{ margin: 0, padding: 0 }}
              // Render icon only; no extra selectable separator text nodes.
              copyable={{ text: resolvedCopyText, tooltips: ['', ''] }}
            />
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <Typography.Text
      style={{
        width: '100%',
        margin: 0,
        padding: 0,
      }}
      title=""
      ellipsis={ellipsis}
    >
      {dom}
    </Typography.Text>
  );
};
