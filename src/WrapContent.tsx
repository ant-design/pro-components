import React, { CSSProperties } from 'react';
import { ConfigProvider, Layout } from 'antd';
import ResizeObserver from 'rc-resize-observer';
import GridContent from './GridContent';

import { debounce } from './utils/utils';

const { Content } = Layout;

class WrapContent extends React.Component<{
  isChildrenLayout?: boolean;
  className?: string;
  style?: CSSProperties;
  location?: any;
  contentHeight?: number | string;
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
    const { style, className, children, isChildrenLayout } = this.props;
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
            className="ant-pro-basicLayout-children-content-wrap"
          >
            <GridContent>{children}</GridContent>
          </div>
        </ConfigProvider>
      </Content>
    );
  }
}

class ResizeObserverContent extends React.Component<
  {
    isChildrenLayout?: boolean;
    className?: string;
    style?: CSSProperties;
    location?: any;
    children: any;
  },
  {
    contentHeight: number | undefined;
  }
> {
  state: { contentHeight: number | undefined } = {
    contentHeight: undefined,
  };

  resize = debounce(({ height }: { height: number }) => {
    const { contentHeight } = this.state;
    if (contentHeight !== height) {
      this.setState({
        contentHeight: height,
      });
    }
  }, 100);

  componentWillUnmount() {
    window.clearTimeout(this.resize.id);
  }

  render() {
    const { contentHeight } = this.state;
    return (
      <div
        style={{
          minHeight: contentHeight,
        }}
      >
        <ResizeObserver onResize={this.resize}>
          <WrapContent {...this.props} contentHeight={contentHeight} />
        </ResizeObserver>
      </div>
    );
  }
}

export default ResizeObserverContent;
