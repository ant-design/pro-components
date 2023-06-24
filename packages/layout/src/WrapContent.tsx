import { ProProvider } from '@ant-design/pro-provider';
import { ErrorBoundary } from '@ant-design/pro-utils';
import { Layout } from 'antd';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { useContext } from 'react';

const WrapContent: React.FC<{
  hasPageContainer?: number;
  isChildrenLayout?: boolean;
  prefixCls?: string;
  style?: CSSProperties;
  location?: any;
  contentHeight?: number | string;
  ErrorBoundary?: any;
  children?: React.ReactNode;
  hasHeader: boolean;
}> = (props) => {
  const { hashId } = useContext(ProProvider);
  const { style, prefixCls, children, hasPageContainer = 0 } = props;

  const contentClassName = classNames(`${prefixCls}-content`, hashId, {
    [`${prefixCls}-has-header`]: props.hasHeader,
    [`${prefixCls}-content-has-page-container`]: hasPageContainer > 0,
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
