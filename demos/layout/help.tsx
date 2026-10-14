import { ProHelp, ProHelpPanel } from '@ant-design/pro-components';

export default () => (
  <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
    <ProHelp
      dataSource={[
        {
          title: '常见问题',
          key: 'faq',
          children: [
            {
              title: '如何创建项目？',
              key: 'create',
              children: [
                { valueType: 'h1', children: '创建项目' },
                {
                  valueType: 'text',
                  children: '进入项目页面，点击“新建项目”，填写名称后保存。',
                },
              ],
            },
            {
              title: '如何邀请成员？',
              key: 'invite',
              children: [
                { valueType: 'h1', children: '邀请成员' },
                {
                  valueType: 'text',
                  children: '打开项目设置，在成员列表中点击“邀请成员”。',
                },
              ],
            },
          ],
        },
      ]}
    >
      <ProHelpPanel defaultSelectedKey="create" height={480} />
    </ProHelp>
  </div>
);
