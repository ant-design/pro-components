import { ProForm, ProFormUploadButton } from '@ant-design/pro-components';

export default () => (
  <ProForm
    readonly
    submitter={false}
    initialValues={{ value: [{ uid: '1', name: '合同.pdf', status: 'done' }] }}
  >
    <ProFormUploadButton name="value" label="附件" />
  </ProForm>
);
