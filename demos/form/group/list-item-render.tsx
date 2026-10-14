import {
  ProCard,
  ProForm,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false}>
    <ProFormList
      name="users"
      label="用户"
      initialValue={[{ name: '林青' }]}
      itemRender={({ listDom, action }, { record }) => (
        <ProCard title={record?.name} extra={action} variant="outlined">
          {listDom}
        </ProCard>
      )}
    >
      <ProFormText name="name" label="姓名" />
    </ProFormList>
  </ProForm>
);
