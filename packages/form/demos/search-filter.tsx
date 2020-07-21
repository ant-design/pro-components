import React from 'react';
import { SearchFilter, ProFormText } from '../src';

export default () => {
  return (
    <div>
      <SearchFilter onFinish={values => console.log(values)}>
        <ProFormText name="name" label="开始日期" />
        <ProFormText name="name2" label="名称" />
      </SearchFilter>
    </div>
  );
};
