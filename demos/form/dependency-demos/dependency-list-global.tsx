import {
  ProForm,
  ProFormDependency,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';

export default () => (
  <ProForm
    initialValues={{ region: '华东', members: [{ region: '华南' }] }}
    submitter={false}
  >
    <ProFormText name="region" label="全局区域" />
    <ProFormList name="members" label="成员">
      <ProFormText name="region" label="成员区域" />
      <ProFormDependency name={['region']} ignoreFormListField>
        {({ region }) => <div>读取全局区域：{region}</div>}
      </ProFormDependency>
    </ProFormList>
  </ProForm>
);
