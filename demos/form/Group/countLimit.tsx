import { CloseOutlined, SnippetsOutlined } from '@ant-design/icons';
import type { FormListActionType } from '@xxlabs/pro-components';
import { ProForm, ProFormList, ProFormText } from '@xxlabs/pro-components';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >(undefined);
  return (
    <>
      <ProForm>
        <ProFormList
          actionGuard={{
            beforeAddRow: async (defaultValue, insertIndex, count) => {
              return new Promise((resolve) => {
                console.log(defaultValue?.name, insertIndex, count);
                setTimeout(() => resolve(true), 1000);
              });
            },
            beforeRemoveRow: async (index, count) => {
              const row = actionRef.current?.get(index as number);
              console.log('--->', index, count, row);
              return new Promise((resolve) => {
                if (index === 0) {
                  resolve(false);
                  return;
                }
                setTimeout(() => resolve(true), 1000);
              });
            },
          }}
          actionRef={actionRef}
          copyIconProps={{
            Icon: SnippetsOutlined,
          }}
          deleteIconProps={{
            Icon: CloseOutlined,
          }}
          initialValue={[
            {
              name: '1111',
            },
          ]}
          label="用户信息"
          max={4}
          min={1}
          name="users"
        >
          <ProFormText key="useMode" label="姓名" name="name" />
        </ProFormList>
      </ProForm>
    </>
  );
};
