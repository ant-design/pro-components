import React, { useContext } from 'react';
import { Space, ConfigProvider } from 'antd';
import type { ProFieldFC } from '../../index';

/**
 * 一般用于放多个按钮
 * @param
 */
const FieldOptions: ProFieldFC<{}> = ({ text, mode: type, render, fieldProps }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-field-option');

  if (render) {
    const dom = (render(
      text,
      { mode: type, ...fieldProps },
      <></>,
    ) as unknown) as React.ReactNode[];
    if (!dom || dom?.length < 1) {
      return null;
    }

    return (
      <Space size={16} className={className}>
        {dom}
      </Space>
    );
  }

  if (!text || !Array.isArray(text)) {
    return text as JSX.Element;
  }

  return (
    <Space size={16} className={className}>
      {text}
    </Space>
  );
};

export default FieldOptions;
