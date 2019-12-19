import React, { useRef, CSSProperties, useState } from 'react';
import { ConfigProvider, Layout } from 'antd';
import ResizeObserver from 'rc-resize-observer';

const { Content } = Layout;

const WrapContent: React.FC<{
  isChildrenLayout?: boolean;
  className?: string;
  style?: CSSProperties;
}> = ({ style, className, children, isChildrenLayout }) => {
  const [contentSize, setContentSize] = useState<number | string>('100%');

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Content
      className={className}
      style={{
        ...style,
        minHeight: contentSize,
      }}
    >
      <ResizeObserver
        onResize={({ height }) => {
          setContentSize(height);
        }}
      >
        <ConfigProvider
          getPopupContainer={() => {
            if (!isChildrenLayout && ref.current) {
              return ref.current;
            }
            return document.body;
          }}
        >
          <div ref={ref} className="ant-pro-basicLayout-children-content-wrap">
            {children}
          </div>
        </ConfigProvider>
      </ResizeObserver>
    </Content>
  );
};

export default WrapContent;
