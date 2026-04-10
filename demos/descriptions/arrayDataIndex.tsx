import type { ProDescriptionsActionType } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

const Demo = () => {
  const actionRef = useRef<ProDescriptionsActionType>();
  return (
    <ProDescriptions
      actionRef={actionRef}
      title="高级定义列表 request"
      request={async () => {
        return Promise.resolve({
          success: true,
          data: {
            info: {
              id: '这是一段文本',
              date: '20200730',
              money: '12121',
            },
          },
        });
      }}
      editable={{
        onSave: async (_keypath, _newInfo, _oriInfo) => {
          return true;
        },
      }}
      columns={[
        {
          formItemProps: {
            rules: [
              {
                required: true,
                message: '此项为必填项',
              },
            ],
          },
          dataIndex: ['info', 'id'],
        },
        {
          dataIndex: ['info', 'date'],
          label: '日期',
          valueType: 'date',
        },
        {
          label: 'money',
          dataIndex: ['info', 'money'],
          valueType: 'money',
        },
        {
          label: '文本',
          valueType: 'option',
          render: () => [
            <Button
              type="primary"
              onClick={() => {
                actionRef.current?.reload();
              }}
              key="reload"
            >
              刷新
            </Button>,
            <Button key="rest">重置</Button>,
          ],
        },
      ]}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
