import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
  return (
    <>
      <ProCard style={{ marginTop: 8 }} gutter={8} title="24栅格">
        <ProCard colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }} layout="center" bordered>
          Col
        </ProCard>
        <ProCard colSpan={{ xs: 20, sm: 16, md: 12, lg: 8, xl: 4 }} layout="center" bordered>
          Col
        </ProCard>
        <ProCard colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }} layout="center" bordered>
          Col
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }} gutter={8} title="指定宽度px">
        <ProCard
          colSpan={{
            xs: '50px',
            sm: '100px',
            md: '200px',
            lg: '300px',
            xl: '400px',
          }}
          layout="center"
          bordered
        >
          Col
        </ProCard>
        <ProCard layout="center" bordered>
          Auto
        </ProCard>
      </ProCard>

      <ProCard style={{ marginTop: 8 }} gutter={8} title="指定宽度百分比">
        <ProCard layout="center" bordered>
          Auto
        </ProCard>
        <ProCard
          layout="center"
          colSpan={{
            xs: '10%',
            sm: '20%',
            md: '30%',
            lg: '40%',
            xl: '50%',
          }}
          bordered
        >
          Col - 百分比
        </ProCard>
      </ProCard>
    </>
  );
};
