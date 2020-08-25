import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
  return (
    <>
      <ProCard gutter={[16, 16]}>
        <ProCard colSpan="300px" title="title" headerBordered bordered>
          300px
        </ProCard>
        <ProCard bordered>Auto</ProCard>
      </ProCard>

      <ProCard gutter={[{ xs: 8, sm: 8, md: 16, lg: 24, xl: 32 }, 16]} style={{ marginTop: 16 }}>
        <ProCard bordered>Responsive</ProCard>
        <ProCard bordered>Responsive</ProCard>
        <ProCard bordered>Responsive</ProCard>
      </ProCard>

      <ProCard gutter={16} style={{ marginTop: 16 }}>
        <ProCard bordered>Auto</ProCard>
        <ProCard bordered>Auto</ProCard>
        <ProCard bordered>Auto</ProCard>
      </ProCard>
    </>
  );
};
