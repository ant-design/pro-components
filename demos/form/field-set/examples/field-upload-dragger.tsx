import { ProForm, ProFormUploadDragger } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{}}>
    <ProFormUploadDragger
      name="attachment"
      label="附件"
      fieldProps={{ beforeUpload: () => false }}
    />
  </ProForm>
);
