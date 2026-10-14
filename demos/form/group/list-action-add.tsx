import type { FormListActionType } from '@ant-design/pro-components';
import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef<FormListActionType<{ name: string }>>();

  return (
    <>
      <Button
        onClick={() => actionRef.current?.add({ name: '新用户' })}
        style={{ marginBottom: 16 }}
      >
        添加预填行
      </Button>
      <ProForm submitter={false}>
        <ProFormList name="users" label="用户" actionRef={actionRef}>
          <ProFormText name="name" label="姓名" />
        </ProFormList>
      </ProForm>
    </>
  );
};
