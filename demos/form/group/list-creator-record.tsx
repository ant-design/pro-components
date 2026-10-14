import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false}>
    <ProFormList name="users" label="用户" creatorRecord={{ name: '新用户' }}>
      <ProFormText name="name" label="姓名" />
    </ProFormList>
  </ProForm>
);
