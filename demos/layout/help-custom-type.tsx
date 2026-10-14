import type { ProHelpDataSourceChildren } from '@ant-design/pro-components';
import { ProHelp, ProHelpPanel } from '@ant-design/pro-components';
import { Tag } from 'antd';

const valueTypeMap = new Map<
  string,
  (item: ProHelpDataSourceChildren<{ badge: string }>) => React.ReactNode
>();

valueTypeMap.set('badge', (item) => (
  <Tag color="processing">{String(item.children)}</Tag>
));

export default () => (
  <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
    <ProHelp<{ badge: string }>
      valueTypeMap={valueTypeMap}
      dataSource={[
        {
          title: '使用指南',
          key: 'guide',
          children: [
            {
              title: '处理状态',
              key: 'status',
              children: [
                { valueType: 'h1', children: '处理状态' },
                { valueType: 'badge', children: '处理中' },
                {
                  valueType: 'text',
                  children: '通过 valueTypeMap 渲染自定义状态标签。',
                },
              ],
            },
          ],
        },
      ]}
    >
      <ProHelpPanel defaultSelectedKey="status" height={360} />
    </ProHelp>
  </div>
);
