import React, { CSSProperties, useState } from 'react';
import { ConfigProvider, Layout } from 'antd';
import ResizeObserver from 'rc-resize-observer';

import { debounce } from './utils/utils';

const { Content } = Layout;

class WrapContent extends React.Component<{
  isChildrenLayout?: boolean;
  className?: string;
  style?: CSSProperties;
  location?: any;
  contentHeight: number | string;
}> {
  ref: HTMLDivElement | null = null;

  shouldComponentUpdate(_: any) {
    if (_.contentHeight !== this.props.contentHeight) {
      return true;
    }
    if (_.children !== this.props.children) {
      return true;
    }
    return false;
  }

  render() {
    const {
      style,
      className,
      contentHeight,
      children,
      isChildrenLayout,
    } = this.props;
    return (
      <Content
        className={className}
        style={{
          ...style,
          minHeight: contentHeight,
        }}
      >
        <ConfigProvider
          getPopupContainer={() => {
            if (isChildrenLayout && this.ref) {
              return this.ref;
            }
            return document.body;
          }}
        >
          <div
            ref={ele => {
              this.ref = ele;
            }}
            className="ant-pro-basicLayout-children-content-wrap"
          >
            {children}
          </div>
        </ConfigProvider>
      </Content>
    );
  }
}

export default (props: {
  isChildrenLayout?: boolean;
  className?: string;
  style?: CSSProperties;
  location?: any;
  children: any;
}) => {
  const [contentHeight, setContentHeight] = useState<string | number>('auto');
  const resize = debounce(({ height }: { height: number }) => {
    if (contentHeight !== height) {
      setContentHeight(height);
    }
  }, 100);
  return (
    <ResizeObserver onResize={resize}>
      <WrapContent {...props} contentHeight={contentHeight} />
    </ResizeObserver>
  );
};
