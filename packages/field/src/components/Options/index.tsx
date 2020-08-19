import React, { useContext } from 'react';
import { Space } from 'antd';
import { ConfigContext } from 'antd/lib/config-provider/context';
import { ProFieldFC } from '../../index';

/**
 * 默认的 index 列容器，提供一个好看的 index
 * @param param0
 */
const FieldOptions: ProFieldFC<{}> = ({ text, mode: type, render, fieldProps }) => {
  const { getPrefixCls } = useContext(ConfigContext);
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
    return <Space className={className}>{dom}</Space>;
  }
  if (!text || !Array.isArray(text)) {
    return text as JSX.Element;
  }
  if (Array.isArray(text) && (text as any[])?.length < 2) {
    return <>{text as JSX.Element[]}</>;
  }
  return <Space className={className}>{text}</Space>;
};

export default FieldOptions;
