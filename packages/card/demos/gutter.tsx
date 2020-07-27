import React from 'react';
import ProCard from '../src/index';

export default () => {
  return (
    <>
      <ProCard gutter={[16, 16]}>
        <ProCard colSpan="300px" title="title" headerBordered>
          300px
        </ProCard>
        <ProCard>auto</ProCard>
        <ProCard>auto</ProCard>
      </ProCard>

      <ProCard gutter={16}>
        <ProCard>auto</ProCard>
        <ProCard>auto</ProCard>
        <ProCard>auto</ProCard>
      </ProCard>
    </>
  );
};
