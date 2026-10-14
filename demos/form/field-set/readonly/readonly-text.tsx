import { ProForm, ProFormText } from '@ant-design/pro-components';

export default () => (
  <ProForm
    readonly
    submitter={false}
    initialValues={{ value: '示例科技有限公司' }}
  >
    <ProFormText name="value" label="公司名称" />
  </ProForm>
);
