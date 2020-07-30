import React from 'react';
import ProCard from '../src/index';

export default () => {
  return (
    <>
      <ProCard gutter={[16, 16]}>
        <ProCard colSpan="300px" title="title" headerBordered>
          300px
        </ProCard>
        <ProCard>Auto</ProCard>
        <ProCard>Auto</ProCard>
      </ProCard>

      <ProCard gutter={[{ xs: 8, sm: 8, md: 16, lg: 24, xl: 32 }, 16]}>
        <ProCard>Responsive</ProCard>
        <ProCard>Responsive</ProCard>
        <ProCard>Responsive</ProCard>
      </ProCard>

      <ProCard gutter={16}>
        <ProCard>Auto</ProCard>
        <ProCard>Auto</ProCard>
        <ProCard>Auto</ProCard>
      </ProCard>
    </>
  );
};
