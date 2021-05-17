import React from 'react';
import { Spin } from 'antd';
import type { SpinProps } from 'antd';

const PageLoading: React.FC<SpinProps> = (props) => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" {...props} />
  </div>
);

export default PageLoading;
