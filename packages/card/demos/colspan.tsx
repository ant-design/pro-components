import React from 'react';
import ProCard from '../src/index';

export default () => {
  return (
    <>
      <ProCard layout="center">colSpan - 24</ProCard>
      <ProCard colSpan={12} layout="center" style={{ marginTop: 8 }}>
        colSpan - 12
      </ProCard>
      <ProCard colSpan={8} layout="center" style={{ marginTop: 8 }}>
        colSpan - 8
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8}>
        <ProCard colSpan={12} layout="center">
          colSpan-12
        </ProCard>
        <ProCard colSpan={6} layout="center">
          colSpan-6
        </ProCard>
        <ProCard colSpan={6} layout="center">
          colSpan-6
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8}>
        <ProCard colSpan={8} layout="center">
          colSpan-8
        </ProCard>
        <ProCard layout="center">Auto</ProCard>
        <ProCard layout="center">Auto</ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8}>
        <ProCard colSpan="200px" layout="center">
          colSpan - 200px
        </ProCard>
        <ProCard layout="center">Auto</ProCard>
        <ProCard layout="center">Auto</ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8}>
        <ProCard>Auto</ProCard>
        <ProCard colSpan="30%">colSpan - 30%</ProCard>
      </ProCard>
    </>
  );
};
