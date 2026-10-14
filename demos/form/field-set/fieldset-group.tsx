import {
  ProForm,
  ProFormFieldSet,
  ProFormText,
} from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ name: ['Alice', 'Bob'] }}>
    <ProFormFieldSet name="name" label="成员姓名" type="group">
      <ProFormText width="xs" placeholder="第一位" />
      <ProFormText width="xs" placeholder="第二位" />
    </ProFormFieldSet>
  </ProForm>
);
