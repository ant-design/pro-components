import {
  ProForm,
  ProFormGroup,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';

const Demo = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <ProForm
        name="list-arrowsort-demo"
        onFinish={async (e) => console.log(e)}
      >
        <ProFormText name="name" label="姓名" />

        <ProFormList
          name="labels"
          label="用户信息"
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
          arrowSort={true}
          upIconProps={{ tooltipText: '' }}
        >
          <ProFormGroup key="group">
            <ProFormText name="value" label="值" />
            <ProFormText name="label" label="显示名称" />
          </ProFormGroup>
        </ProFormList>
      </ProForm>
    </div>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
