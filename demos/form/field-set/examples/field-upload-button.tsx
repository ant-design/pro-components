import { ProForm, ProFormUploadButton } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{}}>
    <ProFormUploadButton
      name="attachment"
      label="附件"
      fieldProps={{ beforeUpload: () => false }}
    />
  </ProForm>
);
