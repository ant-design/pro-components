import type { ProDescriptionsActionType } from '@ant-design/pro-components';
import { ProDescriptions, ProDescriptionsItem } from '@ant-design/pro-components';
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
        onSave: async (keypath, newInfo, oriInfo) => {

          return true;
        },
      }}
    >
      <ProDescriptionsItem
        formItemProps={{
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        }}
        dataIndex={['info', 'id']}
      />
      <ProDescriptionsItem
        dataIndex={['info', 'date']}
        label="日期"
        valueType="date"
      />
      <ProDescriptionsItem
        label="money"
        dataIndex={['info', 'money']}
        valueType="money"
      />
      <ProDescriptionsItem label="文本" valueType="option">
        <Button
          type="primary"
          onClick={() => {
            actionRef.current?.reload();
          }}
          key="reload"
        >
          刷新
        </Button>
        <Button key="rest">重置</Button>
      </ProDescriptionsItem>
    </ProDescriptions>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
