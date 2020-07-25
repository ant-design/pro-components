import React from 'react';
import ProForm, { SearchFilter, ProFormText } from '../src';

export default () => {
  return (
    <SearchFilter onFinish={(values) => console.log(values)}>
      <ProForm.Group title="分组一">
        <ProFormText name="name" />
        <a style={{ marginTop: -22, marginLeft: -16, display: 'block' }}>
          只看自己的
        </a>
      </ProForm.Group>
      <ProForm.Group title="分组二">
        <ProFormText name="name2" label="开始日期" />
        <ProFormText name="name3" label="名称" />
      </ProForm.Group>
    </SearchFilter>
  );
};
