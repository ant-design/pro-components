import type { CSSProperties } from 'react';
import React from 'react';
import { Layout } from 'antd';
import { ConfigProviderWrap } from '@ant-design/pro-provider';
import { ErrorBoundary } from '@ant-design/pro-utils';

const WrapContent: React.FC<{
  isChildrenLayout?: boolean;
  className?: string;
  style?: CSSProperties;
  location?: any;
  contentHeight?: number | string;
  ErrorBoundary?: any;
  brandBgImg?: any;
}> = (props) => {
  const { style, brandBgImg, className, children } = props;
  const ErrorComponent = props.ErrorBoundary || ErrorBoundary;
  const brandBgImgStyle: CSSProperties = brandBgImg
    ? {
        backgroundImage: `url("${brandBgImg?.url}")`,
        backgroundSize: `${brandBgImg?.size || '306px'}`,
        backgroundPosition: 'top 0px right 95px',
        backgroundRepeat: 'no-repeat',
      }
    : {};
  return (
    <ConfigProviderWrap>
      <ErrorComponent>
        <Layout.Content
          className={className}
          style={{
            ...brandBgImgStyle,
            ...style,
          }}
        >
          {children}
        </Layout.Content>
      </ErrorComponent>
    </ConfigProviderWrap>
  );
};

export default WrapContent;
