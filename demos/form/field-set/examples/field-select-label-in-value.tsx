import { ProForm, ProFormSelect } from '@ant-design/pro-components';

export default () => (
  <ProForm
    submitter={false}
    initialValues={{ status: { label: '未解决', value: 'open' } }}
  >
    <ProFormSelect
      name="status"
      label="状态"
      fieldProps={{ labelInValue: true }}
      request={async () => [
        { label: '未解决', value: 'open' },
        { label: '已解决', value: 'closed' },
      ]}
    />
  </ProForm>
);
