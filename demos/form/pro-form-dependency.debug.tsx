import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormGroup,
  ProFormList,
  ProFormSwitch,
  ProFormText,
} from '@xxlabs/pro-components';

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
          <ProFormGroup>
            <ProFormSwitch label="显示名称" name="is_show" />
          </ProFormGroup>
          <ProFormDependency name={['is_show']}>
            {({ is_show }) => {
              console.log(is_show);
              if (!is_show) return null;
              return (
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
                  <ProFormGroup>
                    <ProFormText label="值" name="value" />
                    <ProFormSwitch label="显示名称" name="is_show" />
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
