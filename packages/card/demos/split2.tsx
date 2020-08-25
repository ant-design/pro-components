import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
  return (
    <ProCard title="左右分栏带标题" extra="2019年9月28日" split="vertical" bordered headerBordered>
      <ProCard title="左侧详情" colSpan="300px">
        左侧内容
      </ProCard>
      <ProCard title="流量占用情况">
        <div style={{ height: 360 }}>右侧内容</div>
      </ProCard>
    </ProCard>
  );
};
