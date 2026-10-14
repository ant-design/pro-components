import { ProForm, ProFormCascader } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{}}>
    <ProFormCascader
      name="area"
      label="地址"
      request={async () => [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [{ value: 'hangzhou', label: '杭州' }],
        },
      ]}
    />
  </ProForm>
);
