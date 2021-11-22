import { Typography } from 'antd';
import React from 'react';

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
 * 生成 Copyable 或 Ellipsis 的 dom
 *
 * @param dom
 * @param item
 * @param text
 */
export const genCopyable = (dom: React.ReactNode, item: any, text: string) => {
  let domText = dom;

  if (item.copyable || item.ellipsis) {
    const copyable =
      item.copyable && text
        ? {
            text,
            tooltips: ['', ''],
          }
        : undefined;

    /** 有些 valueType 需要设置copy的为string */
    const needTranText = isNeedTranText(item);

    /** 剔除警告 https://github.com/ant-design/ant-design/blob/master/components/typography/Base.tsx#L329 */
    if (React.isValidElement(dom)) {
      domText = dom.props?.text || dom;
    }

    const ellipsis =
      item.ellipsis && text
        ? {
            tooltip: needTranText ? <div className="pro-table-tooltip-text">{dom}</div> : text,
          }
        : false;
    return (
      <Typography.Text
        style={{
          width: '100%',
          margin: 0,
          padding: 0,
        }}
        title=""
        copyable={copyable}
        ellipsis={ellipsis}
      >
        {domText}
      </Typography.Text>
    );
  }
  return dom;
};
