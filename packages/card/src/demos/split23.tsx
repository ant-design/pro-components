import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
  return (
    <ProCard split="vertical">
      <ProCard title="左侧详情" colSpan="30%">
        左侧内容
      </ProCard>
      <ProCard title="左右分栏子卡片带标题" headerBordered>
        <div style={{ height: 360 }}>右侧内容</div>
      </ProCard>
    </ProCard>
  );
};
