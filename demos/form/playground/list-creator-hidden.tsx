import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false}>
    <ProFormList
      name="members"
      label="成员"
      initialValue={[{ name: 'Alice' }]}
      creatorButtonProps={false}
    >
      <ProFormText name="name" label="姓名" width="sm" />
    </ProFormList>
  </ProForm>
);
