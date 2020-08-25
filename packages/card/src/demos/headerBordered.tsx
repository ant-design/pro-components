import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
  return (
    <ProCard title="标题" extra="extra" tip="这是提示" style={{ width: 300 }} headerBordered>
      内容
    </ProCard>
  );
};
