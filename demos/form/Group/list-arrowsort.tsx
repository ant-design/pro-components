import { ProForm, ProFormGroup, ProFormList, ProFormText } from '@xxlabs/pro-components';

const Demo = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <ProForm onFinish={async (e) => console.log(e)}>
        <ProFormText label="姓名" name="name" />

        <ProFormList
          arrowSort={true}
          initialValue={[
            {
              value: '111',
              label: '111',
            },
            {
              value: '222',
              label: '222',
            },
            {
              value: '333',
              label: '333',
            },
          ]}
          label="用户信息"
          name="labels"
          upIconProps={{ tooltipText: '' }}
        >
          <ProFormGroup key="group">
            <ProFormText label="值" name="value" />
            <ProFormText label="显示名称" name="label" />
          </ProFormGroup>
        </ProFormList>
      </ProForm>
    </div>
  );
};

export default Demo;
