import type { FormListActionType } from '@ant-design/pro-components';
import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef<FormListActionType<{ name: string }>>();

  return (
    <ProForm submitter={false}>
      <ProFormList
        name="users"
        label="用户"
        actionRef={actionRef}
        initialValue={[{ name: '林青' }]}
        actionGuard={{
          beforeAddRow: async () => {
            if ((actionRef.current?.getList()?.length ?? 0) >= 2) {
              message.warning('最多添加两位用户');
              return false;
            }
            return true;
          },
          beforeRemoveRow: async (index) => {
            if (index === 0) {
              message.warning('第一位用户不能删除');
              return false;
            }
            return true;
          },
        }}
      >
        <ProFormText name="name" label="姓名" />
      </ProFormList>
    </ProForm>
  );
};
