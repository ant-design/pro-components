import { ProForm, ProFormTreeSelect } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false}>
    <ProFormTreeSelect
      name="team"
      label="异步树节点"
      width="sm"
      request={async () => [
        {
          label: '研发',
          value: 'dev',
          children: [
            { label: '前端', value: 'frontend' },
            { label: '后端', value: 'backend' },
          ],
        },
      ]}
    />
  </ProForm>
);
