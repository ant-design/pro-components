import ProSkeleton from '@ant-design/pro-skeleton';
import React from 'react';

export default () => {
  return (
    <div
      style={{
        background: '#fafafa',
        padding: 24,
      }}
    >
      <ProSkeleton type="descriptions" />
    </div>
  );
};
