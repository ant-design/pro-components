import type { SpinProps } from 'antd';
import { Spin } from 'antd';
import React from 'react';

const PageLoading: React.FC<SpinProps & any> = ({
  isLoading: _isLoading,
  pastDelay: _pastDelay,
  timedOut: _timedOut,
  error: _error,
  retry: _retry,
  ...reset
}) => (
  <div style={{ paddingBlockStart: 100, textAlign: 'center' }}>
    <Spin size="large" {...reset} />
  </div>
);

export { PageLoading };
