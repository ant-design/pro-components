import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';

export default () => (
  <ProForm
    readonly
    submitter={false}
    initialValues={{ value: [{ name: 'Alice' }, { name: 'Bob' }] }}
  >
    <ProFormList name="value" label="成员">
      <ProFormText name="name" label="姓名" />
    </ProFormList>
  </ProForm>
);
