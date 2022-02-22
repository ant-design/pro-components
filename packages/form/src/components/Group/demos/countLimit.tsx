import { CloseOutlined, SnippetsOutlined } from '@ant-design/icons';
import ProForm, { ProFormList, ProFormText } from '@ant-design/pro-form';

export default () => {
  return (
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
        actionGuard={{
          beforeAddRow: async (defaultValue, insertIndex, count) => {
            return new Promise((resolve) => {
              console.log(defaultValue?.name, insertIndex, count);
              setTimeout(() => resolve(true), 1000);
            });
          },
          beforeRemoveRow: async (index, count) => {
            console.log('--->', index, count);
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
        <ProFormText name="name" label="姓名" />
      </ProFormList>
    </ProForm>
  );
};
