import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
  return (
    <>
      <ProCard loading style={{ maxWidth: 300 }}>
        内容
      </ProCard>

      <ProCard loading style={{ maxWidth: 300, marginTop: 16 }} layout="center">
        内容
      </ProCard>

      <ProCard
        title="自定义 Loading"
        extra="extra"
        loading={<div>加载中</div>}
        style={{ maxWidth: 300, marginTop: 16 }}
      >
        内容
      </ProCard>
    </>
  );
};
