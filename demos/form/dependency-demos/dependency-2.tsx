import {
  ProForm,
  ProFormDependency,
  ProFormText,
} from '@ant-design/pro-components';

export default () => (
  <ProForm initialValues={{ region: '华东' }} submitter={false}>
    <ProFormText name="region" label="全局区域" />
    <ProFormDependency name={['region']}>
      {({ region }) => <div>当前全局区域：{region}</div>}
    </ProFormDependency>
  </ProForm>
);
