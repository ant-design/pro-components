import React from 'react';
import { message } from 'antd';
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormField,
} from '@ant-design/pro-form';

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
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
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
          valueType="text"
          mode="read"
          proFieldProps={{
            render: (text, options) => {
              console.log(options);
              return <div style={options.style}>123</div>;
            },
          }}
          name="contract123"
          label="合同名称"
        />
        <ProFormField
          valueType="text"
          mode="read"
          proFieldProps={{
            render: (text, options) => {
              console.log(options);
              return <div style={options.style}>123</div>;
            },
          }}
          name="id"
          label="主合同编号"
        />
      </ProForm.Group>
    </ProForm>
  );
};
