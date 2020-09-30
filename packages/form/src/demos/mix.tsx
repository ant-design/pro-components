import React from 'react';
import { message } from 'antd';
import ProForm, { ProFormField } from '@ant-design/pro-form';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <ProForm
      onFinish={async () => {
        await waitTime(2000);
        message.success('提交成功！');
      }}
    >
      <ProForm.Group>
        <ProFormField valueType="text" name="name" label="签约客户名称" placeholder="请输入名称" />
        <ProFormField
          valueType="text"
          name="company"
          label="我方公司名称"
          placeholder="请输入名称"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormField
          initialValue="xxx合同"
          valueType="text"
          mode="read"
          proFieldProps={{
            render: (text, options) => {
              return <div style={options.style}>{text}</div>;
            },
          }}
          name="contract"
          label="合同名称"
        />
        <ProFormField
          initialValue="123"
          valueType="text"
          mode="read"
          proFieldProps={{
            render: (text, options) => {
              return <div style={options.style}>{text}</div>;
            },
          }}
          name="id"
          label="主合同编号"
        />
      </ProForm.Group>
    </ProForm>
  );
};
