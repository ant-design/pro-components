import type { FormListActionType } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormGroup,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import { useRef } from 'react';

const Demo = () => {
  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();
  return (
    <>
      <Space
        style={{
          marginBlockEnd: 24,
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            const list = actionRef.current?.getList();
            actionRef.current?.add({
              name: '新增' + list?.length,
            });
          }}
        >
          增加一行
        </Button>
        <Button
          danger
          onClick={() => {
            actionRef.current?.remove(1);
          }}
        >
          删除一行
        </Button>
        <Button
          onClick={() => {
            actionRef.current?.move(1, 0);
          }}
        >
          移动到第一行
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            const row = actionRef.current?.get(1);
            console.log(row);
          }}
        >
          获取一行数据
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            const row = actionRef.current?.getList();
            console.log(row);
          }}
        >
          获取所有数据
        </Button>
      </Space>
      <ProForm onFinish={async (e) => console.log(e)}>
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
            },
          ]}
          creatorRecord={{
            name: '222',
          }}
          actionGuard={{
            beforeAddRow: async (defaultValue, insertIndex) => {
              return new Promise((resolve) => {
                console.log(defaultValue, insertIndex);
                setTimeout(() => resolve(true), 1000);
              });
            },
            beforeRemoveRow: async (index) => {
              return new Promise((resolve) => {
                if (index === 0) {
                  message.error('这行不能删');
                  resolve(false);
                  return;
                }
                setTimeout(() => resolve(true), 1000);
              });
            },
          }}
          itemRender={({ listDom, action }, { record }) => {
            return (
              <ProCard
                bordered
                extra={action}
                title={record?.name}
                style={{
                  marginBlockEnd: 8,
                }}
              >
                {listDom}
              </ProCard>
            );
          }}
          actionRef={actionRef}
        >
          <ProFormGroup key="group">
            <ProFormText name="name" label="姓名" />
            <ProFormText name="age" label="年龄" />
          </ProFormGroup>
        </ProFormList>
      </ProForm>
    </>
  );
};

export default Demo;
