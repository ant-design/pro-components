import type { ProDescriptionsActionType } from '@xxlabs/pro-components';
import { ProDescriptions } from '@xxlabs/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef<ProDescriptionsActionType>(undefined);
  return (
    <ProDescriptions
      actionRef={actionRef}
      editable={{
        onSave: async (keypath, newInfo, oriInfo) => {
          console.log(keypath, newInfo, oriInfo);
          return true;
        },
      }}
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
      title="高级定义列表 request"
    >
      <ProDescriptions.Item
        dataIndex={['info', 'id']}
        formItemProps={{
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        }}
      />
      <ProDescriptions.Item dataIndex={['info', 'date']} label="日期" valueType="date" />
      <ProDescriptions.Item dataIndex={['info', 'money']} label="money" valueType="money" />
      <ProDescriptions.Item label="文本" valueType="option">
        <Button
          key="reload"
          type="primary"
          onClick={() => {
            actionRef.current?.reload();
          }}
        >
          刷新
        </Button>
        <Button key="rest">重置</Button>
      </ProDescriptions.Item>
    </ProDescriptions>
  );
};
