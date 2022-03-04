import React from 'react';
import ProForm, { QueryFilter, ProFormText } from '@ant-design/pro-form';
import { Input } from 'antd';

export default () => {
  return (
    <>
      <QueryFilter<{
        name: string;
        company: string;
      }>
        onFinish={async (values) => {
          console.log(values.name);
        }}
        span={6}
        defaultCollapsed={false}
      >
        <ProForm.Item name="name" label="test">
          <Input />
        </ProForm.Item>
        <ProFormText name="name" label="应用名称" rules={[{ required: true }]} />
        <ProFormText name="sex" label="性别" />
      </QueryFilter>
      <QueryFilter<{
        name: string;
        company: string;
      }>
        onFinish={async (values) => {
          console.log(values.name);
        }}
        span={6}
        defaultCollapsed={false}
      >
        <ProFormText name="name" label="应用名称" rules={[{ required: true }]} />
        <ProFormText name="creater" label="创建人" />
        <ProFormText name="sex" label="性别" />
      </QueryFilter>
      <QueryFilter<{
        name: string;
        company: string;
      }>
        onFinish={async (values) => {
          console.log(values.name);
        }}
        defaultCollapsed={false}
      >
        <ProFormText name="name" label="应用名称" rules={[{ required: true }]} />
        <ProFormText name="creater" label="创建人" />
        <ProFormText name="sex" label="性别" />
        <ProFormText name="status" label="应用状态" />
        <ProFormText name="startdate" label="响应日期" />
        <ProFormText name="create" label="创建时间" />
      </QueryFilter>
      <QueryFilter<{
        name: string;
        company: string;
      }>
        onFinish={async (values) => {
          console.log(values.name);
        }}
        span={12}
        defaultCollapsed={false}
      >
        <ProFormText name="name" label="应用名称" rules={[{ required: true }]} />
        <ProFormText name="creater" label="创建人" />
        <ProFormText name="sex" label="性别" />
        <ProFormText name="status" label="应用状态" />
        <ProFormText name="startdate" label="响应日期" />
        <ProFormText name="create" label="创建时间" colSize={3} />
      </QueryFilter>
      <QueryFilter<{
        name: string;
        company: string;
      }>
        onFinish={async (values) => {
          console.log(values.name);
        }}
        span={8}
        defaultCollapsed={false}
      >
        <ProFormText name="name" label="应用名称" rules={[{ required: true }]} />
        <ProFormText name="creater" label="创建人" />
        <ProFormText name="sex" label="性别" />
        <ProFormText name="status" label="应用状态" />
        <ProFormText name="startdate" label="响应日期" />
        <ProFormText name="create" label="创建时间" colSize={3} />
      </QueryFilter>
      <QueryFilter<{
        name: string;
        company: string;
      }>
        onFinish={async (values) => {
          console.log(values.name);
        }}
        span={4}
        defaultColsNumber={1}
        defaultCollapsed={false}
      >
        <ProFormText name="name" label="应用名称" rules={[{ required: true }]} />
        <ProFormText name="creater" label="创建人" />
        <ProFormText name="sex" label="性别" />
        <ProFormText name="status" label="应用状态" />
        <ProFormText name="startdate" label="响应日期" />
        <ProFormText name="create" label="创建时间" colSize={3} />
      </QueryFilter>
    </>
  );
};
