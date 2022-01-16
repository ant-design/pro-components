import React, { useRef } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Card } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
  return (
    <>
      <Card style={{ margin: '20px auto' }}>
        <ProForm<{
          name: string;
          company?: string;
          useMode?: string;
        }>
          formRef={formRef}
          params={{ id: '100' }}
          formKey="submitter-algin-left-form-use-demo"
          request={async () => {
            await waitTime(100);
            return {
              name: '蚂蚁设计有限公司',
              useMode: 'chapter',
            };
          }}
          autoFocusFirstInput
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              required
              addonBefore={<a>客户名称应该怎么获得？</a>}
              addonAfter={<a>点击查看更多</a>}
              label="签约客户名称"
              tooltip="最长为 24 位"
              placeholder="请输入名称"
              rules={[{ required: true, message: '这是必填项' }]}
            />
            <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
          </ProForm.Group>
        </ProForm>
      </Card>
      <Card>
        <ProForm<{
          name: string;
          company?: string;
          useMode?: string;
        }>
          formRef={formRef}
          params={{ id: '100' }}
          formKey="submitter-algin-center-form-use-demo"
          submitter={{
            align: 'center',
          }}
          request={async () => {
            await waitTime(100);
            return {
              name: '蚂蚁设计有限公司',
              useMode: 'chapter',
            };
          }}
          autoFocusFirstInput
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              required
              addonBefore={<a>客户名称应该怎么获得？</a>}
              addonAfter={<a>点击查看更多</a>}
              label="签约客户名称"
              tooltip="最长为 24 位"
              placeholder="请输入名称"
              rules={[{ required: true, message: '这是必填项' }]}
            />
            <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
          </ProForm.Group>
        </ProForm>
      </Card>
      <Card style={{ margin: '20px auto' }}>
        <ProForm<{
          name: string;
          company?: string;
          useMode?: string;
        }>
          formRef={formRef}
          params={{ id: '100' }}
          formKey="submitter-algin-right-form-use-demo"
          submitter={{
            align: 'right',
          }}
          request={async () => {
            await waitTime(100);
            return {
              name: '蚂蚁设计有限公司',
              useMode: 'chapter',
            };
          }}
          autoFocusFirstInput
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              required
              addonBefore={<a>客户名称应该怎么获得？</a>}
              addonAfter={<a>点击查看更多</a>}
              label="签约客户名称"
              tooltip="最长为 24 位"
              placeholder="请输入名称"
              rules={[{ required: true, message: '这是必填项' }]}
            />
            <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
          </ProForm.Group>
        </ProForm>
      </Card>
    </>
  );
};
