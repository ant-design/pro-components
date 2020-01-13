import React, { CSSProperties } from 'react';
import { ConfigProvider, Layout } from 'antd';
import ResizeObserver from 'rc-resize-observer';
import { debounce } from './utils/utils';

const { Content } = Layout;

class WrapContent extends React.Component<
  {
    isChildrenLayout?: boolean;
    className?: string;
    style?: CSSProperties;
  },
  {
    contentSize: string | number;
  }
> {
  state: {
    contentSize: string | number;
  } = {
    contentSize: 'auto',
  };

  ref: HTMLDivElement | null = null;

  resize = debounce(({ height }: { height: number }) => {
    const { contentSize } = this.state;
    if (height !== contentSize) {
      this.setState({ contentSize: height });
    }
  }, 100);

  shouldComponentUpdate(
    _: any,
    nextState: {
      contentSize: string | number;
    },
  ) {
    if (nextState.contentSize !== this.state.contentSize) {
      return true;
    }
    if (_.children !== this.props.children) {
      return true;
    }
    return false;
  }

  render() {
    const { contentSize } = this.state;
    const { style, className, children, isChildrenLayout } = this.props;

    return (
      <Content
        className={className}
        style={{
          ...style,
          minHeight: contentSize,
        }}
      >
        <ResizeObserver onResize={this.resize}>
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
        </ResizeObserver>
      </Content>
    );
  }
}

export default WrapContent;
