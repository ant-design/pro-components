import type { CSSProperties } from 'react';
import { useMemo, useContext } from 'react';
import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import { ConfigProviderWrap } from '@ant-design/pro-provider';
import { ErrorBoundary } from '@ant-design/pro-utils';
import { cx, css } from './emotion';

const WrapContent: React.FC<{
  isChildrenLayout?: boolean;
  className?: string;
  style?: CSSProperties;
  location?: any;
  disableContentMargin?: boolean;
  contentHeight?: number | string;
  ErrorBoundary?: any;
}> = (props) => {
  const context = useContext(ConfigProvider.ConfigContext);
  const { style, className, children, disableContentMargin } = props;
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
    <ConfigProviderWrap autoClearCache>
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
