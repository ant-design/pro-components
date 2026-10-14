import { ProForm, ProFormTreeSelect } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ team: 'frontend' }}>
    <ProFormTreeSelect
      name="team"
      label="团队"
      request={async () => [
        {
          title: '研发',
          value: 'dev',
          children: [
            { title: '前端', value: 'frontend' },
            { title: '后端', value: 'backend' },
          ],
        },
      ]}
    />
  </ProForm>
);
