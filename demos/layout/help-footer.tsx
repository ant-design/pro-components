import { ProHelp, ProHelpPanel } from '@ant-design/pro-components';
import { Rate } from 'antd';

export default () => (
  <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
    <ProHelp
      dataSource={[
        {
          title: '帮助中心',
          key: 'help',
          children: [
            {
              title: '提交反馈',
              key: 'feedback',
              children: [
                {
                  valueType: 'text',
                  children: '阅读内容后，可以在下方为本文评分。',
                },
              ],
            },
          ],
        },
      ]}
    >
      <ProHelpPanel
        defaultSelectedKey="feedback"
        height={360}
        footer={
          <div style={{ padding: 12 }}>
            这篇文章有帮助吗？ <Rate />
          </div>
        }
      />
    </ProHelp>
  </div>
);
