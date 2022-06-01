import { CloseOutlined, SnippetsOutlined } from '@ant-design/icons';
import type { FormListActionType } from '@ant-design/pro-components';
import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();
  return (
    <>
      <ProForm>
        <ProFormList
          copyIconProps={{
            Icon: SnippetsOutlined,
          }}
          deleteIconProps={{
            Icon: CloseOutlined,
          }}
          min={1}
          max={4}
          actionRef={actionRef}
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
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
            },
          ]}
        >
          <ProFormText key="useMode" name="name" label="姓名" />
        </ProFormList>
      </ProForm>
    </>
  );
};
