import { Skeleton } from 'antd';
import { clsx } from 'clsx';
import React, { createContext } from 'react';
import type { CheckCardGroupContextType } from './Group';

export const CardLoading: React.FC<{ prefixCls: string; hashId: string }> = ({
  prefixCls,
  hashId,
}) => (
  <div className={clsx(`${prefixCls}-loading-content`, hashId)}>
    <Skeleton loading active paragraph={{ rows: 4 }} title={false} />
  </div>
);

export const CheckCardGroupContext =
  createContext<CheckCardGroupContextType | null>(null);
