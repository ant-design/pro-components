import React from 'react';
import { Button, message } from 'antd';
import { BatchOperationBar } from '@ant-design/pro-utils';

export default () => {
  return (
    <BatchOperationBar
      selectedCount={3}
      selectedText="吃了 {selectedCount} 个苹果"
      cancelText="不吃了"
      onCancel={() => {
        message.info('饿了吗？');
      }}
      actions={[
        <Button
          danger
          onClick={() => {
            message.info('delete');
          }}
        >
          批量删除
        </Button>,
      ]}
    />
  );
};
