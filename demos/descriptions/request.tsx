import type { ProDescriptionsActionType } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

type Result = { name: string; loads: number };

export default () => {
  const actionRef = useRef<ProDescriptionsActionType>();
  const loads = useRef(0);

  return (
    <ProDescriptions<Result>
      actionRef={actionRef}
      title="request 加载详情"
      request={async () => {
        loads.current += 1;
        return {
          data: { name: '组件库', loads: loads.current },
          success: true,
        };
      }}
      extra={
        <Button onClick={() => actionRef.current?.reload()}>重新加载</Button>
      }
      columns={[
        { title: '项目', dataIndex: 'name' },
        { title: '加载次数', dataIndex: 'loads' },
      ]}
    />
  );
};
