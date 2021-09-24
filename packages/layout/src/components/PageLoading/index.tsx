import React from 'react';
import { Spin } from 'antd';
import type { SpinProps } from 'antd';

const PageLoading: React.FC<SpinProps & any> = ({
  isLoading,
  pastDelay,
  timedOut,
  error,
  retry,
  ...reset
}) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Spin size="large" {...reset} />
  </div>
);

export default PageLoading;
