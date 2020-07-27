import React from 'react';

import ProDescriptions from '../src/index';

export default () => {
  return (
    <>
      <ProDescriptions title="title">
        <ProDescriptions.Item label="文本" valueType="money" text="777">
          66690
        </ProDescriptions.Item>
        <ProDescriptions.Item label="文本5">88890</ProDescriptions.Item>
        <ProDescriptions.Item label="文本9">哈哈哈</ProDescriptions.Item>
      </ProDescriptions>
    </>
  );
};
