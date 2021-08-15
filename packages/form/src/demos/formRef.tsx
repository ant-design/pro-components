import React, { useRef } from 'react';
import { message, Button } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<ProFormInstance>();

  const onFill = () => {
    formRef?.current?.setFieldsValue({
      name: '张三',
      company: '蚂蚁金服',
    });
  };

  const getCompanyName = () => {
    message.info(`公司名称为 "${formRef?.current?.getFieldValue('company')}"`);
  };

  return (
    <ProForm
      title="新建表单"
      formRef={formRef}
      submitter={{
        render: (props, doms) => {
          return [
            ...doms,
            <Button htmlType="button" onClick={onFill}>
              一键填写
            </Button>,
            <Button htmlType="button" onClick={getCompanyName}>
              读取公司
            </Button>,
          ];
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="签约客户名称"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />

      <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
    </ProForm>
  );
};
