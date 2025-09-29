import { ProForm, ProFormDatePicker, ProFormText, QueryFilter } from '@xxlabs/pro-components';
import { Input } from 'antd';

export default () => {
  const formProps = {
    defaultColsNumber: 6,
  };
  return (
    <>
      <>
        <QueryFilter {...formProps}>
          <ProFormDatePicker
            // key={i}
            colSize={4}
            label="test"
            name="test"
          />
          {[...Array(10).keys()].map((i) => (
            <ProFormDatePicker key={i} label={`Date${i + 1}`} name={`startdate${i + 1}`} />
          ))}
        </QueryFilter>
        <pre>{JSON.stringify(formProps, null, 2)}</pre>
      </>
      <QueryFilter<{
        name: string;
        company: string;
      }>
        defaultCollapsed={false}
        span={6}
        onFinish={async (values) => {
          console.log(values.name);
        }}
      >
        <ProForm.Item label="test" name="name">
          <Input />
        </ProForm.Item>
        <ProFormText label="应用名称" name="name" rules={[{ required: true }]} />
        <ProFormText label="性别" name="sex" />
      </QueryFilter>
      <QueryFilter<{
        name: string;
        company: string;
      }>
        defaultCollapsed={false}
        span={6}
        onFinish={async (values) => {
          console.log(values.name);
        }}
      >
        <ProFormText label="应用名称" name="name" rules={[{ required: true }]} />
        <ProFormText label="创建人" name="creater" />
        <ProFormText label="性别" name="sex" />
      </QueryFilter>
      <QueryFilter<{
        name: string;
        company: string;
      }>
        defaultCollapsed={false}
        onFinish={async (values) => {
          console.log(values.name);
        }}
      >
        <ProFormText label="应用名称" name="name" rules={[{ required: true }]} />
        <ProFormText label="创建人" name="creater" />
        <ProFormText label="性别" name="sex" />
        <ProFormText label="应用状态" name="status" />
        <ProFormText label="响应日期" name="startdate" />
        <ProFormText label="创建时间" name="create" />
      </QueryFilter>
      <QueryFilter<{
        name: string;
        company: string;
      }>
        defaultCollapsed={false}
        span={12}
        onFinish={async (values) => {
          console.log(values.name);
        }}
      >
        <ProFormText label="应用名称" name="name" rules={[{ required: true }]} />
        <ProFormText label="创建人" name="creater" />
        <ProFormText label="性别" name="sex" />
        <ProFormText label="应用状态" name="status" />
        <ProFormText label="响应日期" name="startdate" />
        <ProFormText colSize={3} label="创建时间" name="create" />
      </QueryFilter>
      <QueryFilter<{
        name: string;
        company: string;
      }>
        defaultCollapsed={false}
        span={8}
        onFinish={async (values) => {
          console.log(values.name);
        }}
      >
        <ProFormText label="应用名称" name="name" rules={[{ required: true }]} />
        <ProFormText label="创建人" name="creater" />
        <ProFormText label="性别" name="sex" />
        <ProFormText label="应用状态" name="status" />
        <ProFormText label="响应日期" name="startdate" />
        <ProFormText colSize={3} label="创建时间" name="create" />
      </QueryFilter>
      <QueryFilter<{
        name: string;
        company: string;
      }>
        defaultCollapsed={false}
        defaultColsNumber={1}
        span={4}
        submitterColSpanProps={{ span: 12 }}
        onFinish={async (values) => {
          console.log(values.name);
        }}
      >
        <ProFormText label="应用名称" name="name" rules={[{ required: true }]} />
        <ProFormText label="创建人" name="creater" />
        <ProFormText label="性别" name="sex" />
        <ProFormText label="应用状态" name="status" />
        <ProFormText label="响应日期" name="startdate" />
        <ProFormText colSize={3} label="创建时间" name="create" />
      </QueryFilter>
    </>
  );
};
