import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
  return (
    <ProCard
      tabs={{
        type: 'card',
      }}
    >
      <ProCard.TabPane key="tab1" tab="产品一">
        内容一
      </ProCard.TabPane>
      <ProCard.TabPane key="tab2" tab="产品二">
        内容二
      </ProCard.TabPane>
    </ProCard>
  );
};
