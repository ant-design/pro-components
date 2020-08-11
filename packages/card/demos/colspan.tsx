import React from 'react';
import ProCard from '../src/index';

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
      <ProCard style={{ marginTop: 8 }} gutter={8} title="自动宽度">
        <ProCard colSpan={8} layout="center" bordered>
          colSpan-8
        </ProCard>
        <ProCard layout="center" bordered>
          Auto
        </ProCard>
        <ProCard layout="center" bordered>
          Auto
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8} title="指定宽度px">
        <ProCard colSpan="200px" layout="center" bordered>
          colSpan - 200px
        </ProCard>
        <ProCard layout="center" bordered>
          Auto
        </ProCard>
        <ProCard layout="center" bordered>
          Auto
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8} title="指定宽度百分比">
        <ProCard bordered>Auto</ProCard>
        <ProCard colSpan="30%" bordered>
          colSpan - 30%
        </ProCard>
      </ProCard>
    </>
  );
};
