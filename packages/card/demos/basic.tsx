import React from 'react';
import ProCard from '../src/index';

export default () => {
  return (
    <ProCard title="标题" extra="extra" tip="这是提示" style={{ width: 300 }}>
      内容
    </ProCard>
  );
};
