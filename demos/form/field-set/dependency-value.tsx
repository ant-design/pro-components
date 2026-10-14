import {
  ProForm,
  ProFormDependency,
  ProFormText,
} from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ name: 'Alice' }}>
    <ProFormText name="name" label="姓名" width="sm" />
    <ProFormDependency name={['name']}>
      {({ name }) => <span>当前姓名：{name || '未填写'}</span>}
    </ProFormDependency>
  </ProForm>
);
