import { CSSProperties, useMemo, useContext } from 'react';
import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import { ConfigProviderWrap } from '@ant-design/pro-provider';
import { ErrorBoundary } from '@ant-design/pro-utils';
import { cx, css } from '@emotion/css';

const WrapContent: React.FC<{
  isChildrenLayout?: boolean;
  className?: string;
  style?: CSSProperties;
  location?: any;
  contentHeight?: number | string;
  ErrorBoundary?: any;
}> = (props) => {
  const context = useContext(ConfigProvider.ConfigContext);
  const { style, className, children } = props;
  const ErrorComponent = props.ErrorBoundary || ErrorBoundary;
  const prefixCls = context.getPrefixCls();

  const ProLayoutCssContent = useMemo(() => {
    return css`
      position: relative;
      margin: 24px;
      > .${prefixCls}-layout {
        max-height: 100%;
      }
      .${prefixCls}-pro-page-container {
        margin: -24px -24px 0;
      }
    `;
  }, [prefixCls]);

  return (
    <ConfigProviderWrap>
      <ErrorComponent>
        <Layout.Content className={cx(className, ProLayoutCssContent)} style={style}>
          {children}
        </Layout.Content>
      </ErrorComponent>
    </ConfigProviderWrap>
  );
};

export { WrapContent };
