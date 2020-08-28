import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
  return (
    <>
      <ProCard layout="center" bordered>
        colSpan - 24
      </ProCard>
      <ProCard colSpan={12} layout="center" bordered style={{ marginTop: 8 }}>
        colSpan - 12
      </ProCard>
      <ProCard colSpan={8} layout="center" bordered style={{ marginTop: 8 }}>
        colSpan - 8
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8} title="24栅格">
        <ProCard colSpan={12} layout="center" bordered>
          colSpan-12
        </ProCard>
        <ProCard colSpan={6} layout="center" bordered>
          colSpan-6
        </ProCard>
        <ProCard colSpan={6} layout="center" bordered>
          colSpan-6
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8} ghost>
        <ProCard colSpan="200px" layout="center" bordered>
          colSpan - 200px
        </ProCard>
        <ProCard layout="center" bordered>
          Auto
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8} ghost>
        <ProCard bordered layout="center">
          Auto
        </ProCard>
        <ProCard colSpan="30%" bordered>
          colSpan - 30%
        </ProCard>
      </ProCard>
    </>
  );
};
