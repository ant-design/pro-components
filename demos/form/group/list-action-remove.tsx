import type { FormListActionType } from '@ant-design/pro-components';
import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef<FormListActionType<{ name: string }>>();

  return (
    <>
      <Button
        onClick={() => actionRef.current?.remove(1)}
        style={{ marginBottom: 16 }}
      >
        删除第二行
      </Button>
      <ProForm submitter={false}>
        <ProFormList
          name="users"
          label="用户"
          actionRef={actionRef}
          initialValue={[{ name: '林青' }, { name: '陈宁' }]}
        >
          <ProFormText name="name" label="姓名" />
        </ProFormList>
      </ProForm>
    </>
  );
};
