import React from 'react';
import { ConfigProvider } from 'antd';
import { clsx } from 'clsx';
import { useStyle } from '../../../utils';
import type { ProFieldFC } from '../../types';

type FieldTextReadProps = Parameters<
  ProFieldFC<{ text: string; emptyText?: React.ReactNode }>
>[0] & {
  emptyText: React.ReactNode;
};

export function FieldTextRead(props: FieldTextReadProps) {
  const { text, mode, render, fieldProps, emptyText } = props;
  const { prefix = '', suffix = '' } = fieldProps || {};
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const readonlyClassName = getPrefixCls('pro-field-readonly');
  const { wrapSSR, hashId } = useStyle('Text', () => ({
    [`.${readonlyClassName}`]: {
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
    },
  }));
  const dom = (
    <span className={clsx(hashId, readonlyClassName)}>
      {prefix}
      {text ?? emptyText}
      {suffix}
    </span>
  );

  if (render) {
    return render(text, { mode, ...fieldProps }, dom) ?? emptyText;
  }
  return wrapSSR(dom);
}
