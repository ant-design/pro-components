/* eslint-disable import/no-unresolved */
import React from 'react';
import ProLayout from '@ant-design/pro-layout';
import defaultProps from '../fixtures/defaultProps';

export default () => {
  return (
    <>
      <ProLayout
        {...defaultProps}
        layout="mix"
        splitMenus
        style={{
          height: 500,
        }}
      />
      <ProLayout
        {...defaultProps}
        layout="mix"
        menuHeaderRender={false}
        splitMenus
        style={{
          height: 500,
        }}
      />

      <ProLayout
        {...defaultProps}
        layout="mix"
        menuHeaderRender={() => null}
        splitMenus
        style={{
          height: 500,
        }}
      />
    </>
  );
};
