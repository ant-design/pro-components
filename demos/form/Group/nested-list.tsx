import { ProCard, ProForm, ProFormGroup, ProFormList, ProFormText } from '@xxlabs/pro-components';

const Demo = () => {
  return (
    <ProForm onFinish={async (e) => console.log(e)}>
      <ProFormText label="姓名" name="name" />
      <ProFormList
        initialValue={[
          {
            name: '1111',
          },
        ]}
        itemRender={({ listDom, action }, { record }) => {
          return (
            <ProCard
              extra={action}
              style={{
                marginBlockEnd: 8,
              }}
              title={record?.name}
              variant="outlined"
            >
              {listDom}
            </ProCard>
          );
        }}
        label="用户信息"
        name="users"
      >
        <ProFormGroup>
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
        </ProFormGroup>
        <ProFormList
          copyIconProps={{
            tooltipText: '复制此项到末尾',
          }}
          deleteIconProps={{
            tooltipText: '不需要这行了',
          }}
          initialValue={[
            {
              value: '333',
              label: '333',
            },
          ]}
          label="用户信息"
          name="labels"
        >
          <ProFormGroup key="group">
            <ProFormText label="值" name="value" />
            <ProFormText label="显示名称" name="label" />
          </ProFormGroup>
        </ProFormList>
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
