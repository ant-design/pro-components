import { ProForm, ProFormTreeSelect } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{ team: 'frontend' }}>
    <ProFormTreeSelect
      name="team"
      label="自定义字段映射"
      width="sm"
      fieldProps={{
        fieldNames: { label: 'title', value: 'treeValue' },
        treeData: [
          {
            title: '研发',
            treeValue: 'dev',
            children: [{ title: '前端', treeValue: 'frontend' }],
          },
        ],
      }}
    />
  </ProForm>
);
