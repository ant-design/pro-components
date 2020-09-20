import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
  return (
    <ProCard title="卡片标题" bordered headerBordered>
      <ProCard title="内部卡片标题" type="inner" bordered headerBordered>
        内部卡片内容
      </ProCard>
      <ProCard title="内部卡片标题" type="inner" bordered headerBordered style={{ marginLeft: 16 }}>
        内部卡片内容
      </ProCard>
    </ProCard>
  );
};
