import React, { useContext } from 'react';
import { Space, ConfigProvider } from 'antd';
import type { ProFieldFC } from '../../index';

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
    });
  });

/**
 * 一般用于放多个按钮
 *
 * @param
 */
const FieldOptions: ProFieldFC = ({ text, mode: type, render, fieldProps }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-field-option');

  if (render) {
    const doms = render(text, { mode: type, ...fieldProps }, <></>) as unknown as React.ReactNode[];

    if (!doms || doms?.length < 1 || !Array.isArray(doms)) {
      return null;
    }

    return (
      <Space size={16} className={className}>
        {addArrayKeys(doms)}
      </Space>
    );
  }

  if (!text || !Array.isArray(text)) {
    if (!React.isValidElement(text)) {
      return null;
    }
    return text as JSX.Element;
  }

  return (
    <Space size={16} className={className}>
      {addArrayKeys(text)}
    </Space>
  );
};

export default FieldOptions;
