import {
  ProForm,
  ProFormFieldSet,
  ProFormText,
} from '@ant-design/pro-components';

export default () => (
  <ProForm
    readonly
    submitter={false}
    initialValues={{ value: ['Alice', 'Bob'] }}
  >
    <ProFormFieldSet name="value" label="成员">
      <ProFormText width="sm" />
      <ProFormText width="sm" />
    </ProFormFieldSet>
  </ProForm>
);
