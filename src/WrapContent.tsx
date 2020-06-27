import React, { CSSProperties } from 'react';
import { ConfigProvider, Layout } from 'antd';

const { Content } = Layout;

class WrapContent extends React.Component<{
  isChildrenLayout?: boolean;
  className?: string;
  style?: CSSProperties;
  location?: any;
  prefixCls?: string;
  contentHeight?: number | string;
}> {
  ref: HTMLDivElement | null = null;

  render() {
    const {
      style,
      prefixCls,
      className,
      children,
      isChildrenLayout,
    } = this.props;
    return (
      <Content className={className} style={style}>
        <ConfigProvider
          getPopupContainer={() => {
            if (isChildrenLayout && this.ref) {
              return this.ref;
            }
            return document.body;
          }}
        >
          <div
            ref={(ele) => {
              this.ref = ele;
            }}
            className={`${prefixCls}-basicLayout-children-content-wrap`}
          >
            {children}
          </div>
        </ConfigProvider>
      </Content>
    );
  }
}

export default WrapContent;
