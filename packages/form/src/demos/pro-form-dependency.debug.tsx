import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormGroup,
  ProFormList,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';

const Demo = () => {
  return (
    <ProForm onFinish={async (e) => console.log(e)}>
      <ProFormText name="name" label="姓名" />
      <ProFormList
        name="users"
        label="用户信息"
        initialValue={[
          {
            name: '1111',
          },
        ]}
        itemRender={({ listDom, action }, { record }) => {
          return (
            <ProCard
              bordered
              extra={action}
              title={record?.name}
              style={{
                marginBlockEnd: 8,
              }}
            >
              {listDom}
            </ProCard>
          );
        }}
      >
        <ProFormGroup>
          <ProFormText name="name" label="姓名" />
        </ProFormGroup>
        <ProFormList
          name="labels"
          label="用户信息"
          initialValue={[
            {
              value: '333',
              label: '333',
            },
          ]}
          copyIconProps={{
            tooltipText: '复制此项到末尾',
          }}
          deleteIconProps={{
            tooltipText: '不需要这行了',
          }}
        >
          <ProFormGroup>
            <ProFormSwitch name="is_show" label="显示名称" />
          </ProFormGroup>
          <ProFormDependency name={['is_show']}>
            {({ is_show }) => {
              console.log(is_show);
              if (!is_show) return null;
              return (
                <ProFormList
                  name="labels"
                  label="用户信息"
                  initialValue={[
                    {
                      value: '333',
                      label: '333',
                    },
                  ]}
                  copyIconProps={{
                    tooltipText: '复制此项到末尾',
                  }}
                  deleteIconProps={{
                    tooltipText: '不需要这行了',
                  }}
                >
                  <ProFormGroup>
                    <ProFormText name="value" label="值" />
                    <ProFormSwitch name="is_show" label="显示名称" />
                  </ProFormGroup>
                </ProFormList>
              );
            }}
          </ProFormDependency>
        </ProFormList>
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
