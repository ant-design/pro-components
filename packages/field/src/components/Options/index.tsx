import { ConfigProvider } from 'antd';
import React, { useContext, useImperativeHandle } from 'react';
import type { ProFieldFC } from '../../index';

// 兼容代码-----------
import { proTheme } from '@ant-design/pro-provider';
import 'antd/lib/space/style';
//----------------------

const addArrayKeys = (doms: React.ReactNode[]) =>
  doms.map((dom, index) => {
    if (!React.isValidElement(dom)) {
      // eslint-disable-next-line react/no-array-index-key
      return <React.Fragment key={index}>{dom}</React.Fragment>;
    }
    return React.cloneElement(dom, {
      // eslint-disable-next-line react/no-array-index-key
      key: index,
      ...dom?.props,
      style: {
        flex: 1,
        // @ts-ignore
        ...dom?.props?.style,
      },
    });
  });

/**
 * 一般用于放多个按钮
 *
 * @param
 */
const FieldOptions: ProFieldFC = (
  { text, mode: type, render, fieldProps },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-field-option');

  const { token } = proTheme.useToken();

  useImperativeHandle(ref, () => ({}));

  if (render) {
    const doms = render(
      text,
      { mode: type, ...fieldProps },
      <></>,
    ) as unknown as React.ReactNode[];

    if (!doms || doms?.length < 1 || !Array.isArray(doms)) {
      return null;
    }

    return (
      <div
        style={{
          display: 'flex',
          gap: token.margin,
          alignItems: 'center',
        }}
        className={className}
      >
        {addArrayKeys(doms)}
      </div>
    );
  }

  if (!text || !Array.isArray(text)) {
    if (!React.isValidElement(text)) {
      return null;
    }
    return text as JSX.Element;
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: token.margin,
        alignItems: 'center',
      }}
      className={className}
    >
      {addArrayKeys(text)}
    </div>
  );
};

export default React.forwardRef(FieldOptions);
