import { ProDescriptions } from '@ant-design/pro-components';

export default () => (
  <div style={{ width: '100%', minWidth: 0, overflow: 'hidden' }}>
    <ProDescriptions
      column={1}
      columns={[
        {
          label: '订单备注',
          dataIndex: 'note',
          ellipsis: true,
        },
      ]}
      dataSource={{
        note: '客户要求在一季度内完成部署，优先安排技术支持并跟进各环节的交付进度。',
      }}
    />
  </div>
);
