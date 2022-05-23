import { ConfigProviderWrap } from '@ant-design/pro-provider';
import { ErrorBoundary } from '@ant-design/pro-utils';
import { ConfigProvider, Layout } from 'antd';
import type { CSSProperties } from 'react';
import React, { useContext, useMemo } from 'react';
import { css, cx } from './emotion';

const WrapContent: React.FC<{
  autoClearCache?: boolean;
  isChildrenLayout?: boolean;
  className?: string;
  style?: CSSProperties;
  location?: any;
  disableContentMargin?: boolean;
  contentHeight?: number | string;
  ErrorBoundary?: any;
  children?: React.ReactNode;
}> = (props) => {
  const context = useContext(ConfigProvider.ConfigContext);
  const { autoClearCache = true, style, className, children, disableContentMargin } = props;
  const ErrorComponent = props.ErrorBoundary || ErrorBoundary;
  const prefixCls = context.getPrefixCls();

  const ProLayoutCssContent = useMemo(() => {
    if (disableContentMargin) {
      return css`
        position: relative;
        > .${prefixCls}-layout {
          max-height: 100%;
        }
      `;
    }
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
  }, [prefixCls, disableContentMargin]);

  return (
    <ConfigProviderWrap autoClearCache={autoClearCache}>
      {props.ErrorBoundary === false ? (
        <Layout.Content className={cx(className, ProLayoutCssContent)} style={style}>
          {children}
        </Layout.Content>
      ) : (
        <ErrorComponent>
          <Layout.Content className={cx(className, ProLayoutCssContent)} style={style}>
            {children}
          </Layout.Content>
        </ErrorComponent>
      )}
    </ConfigProviderWrap>
  );
};

export { WrapContent };
