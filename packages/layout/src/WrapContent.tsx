import { ErrorBoundary } from '@ant-design/pro-utils';
import { Layout } from 'antd';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React from 'react';

const WrapContent: React.FC<{
  autoClearCache?: boolean;
  isChildrenLayout?: boolean;
  prefixCls?: string;
  style?: CSSProperties;
  location?: any;
  contentHeight?: number | string;
  ErrorBoundary?: any;
  children?: React.ReactNode;
  hasHeader: boolean;
}> = (props) => {
  const { style, prefixCls, children } = props;

  const contentClassName = classNames(`${prefixCls}-content`, {
    [`${prefixCls}-has-header`]: props.hasHeader,
  });

  const ErrorComponent = props.ErrorBoundary || ErrorBoundary;
  return props.ErrorBoundary === false ? (
    <Layout.Content className={contentClassName} style={style}>
      {children}
    </Layout.Content>
  ) : (
    <ErrorComponent>
      <Layout.Content className={contentClassName} style={style}>
        {children}
      </Layout.Content>
    </ErrorComponent>
  );
};

export { WrapContent };
