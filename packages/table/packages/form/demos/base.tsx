import React from 'react';
import { Button } from 'antd';
import ProForm, { ProFormText, ProFormDatePicker } from '../src';

export default () => {
  return (
    <ProForm onFinish={values => console.log(values)}>
      <ProFormText name="name" label="名称" />
      <ProFormDatePicker name="date" label="日期" />

      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </ProForm>
  );
};
