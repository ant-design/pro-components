import React, { CSSProperties } from 'react';
import { Layout } from 'antd';

const WrapContent: React.FC<{
  isChildrenLayout?: boolean;
  className?: string;
  style?: CSSProperties;
  location?: any;
  contentHeight?: number | string;
}> = (props) => {
  const { style, className, children } = props;
  return (
    <Layout.Content className={className} style={style}>
      {children}
    </Layout.Content>
  );
};

export default WrapContent;
