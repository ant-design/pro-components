import {
  ProForm,
  ProFormDependency,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';

const Demo = () => {
  return (
    <ProForm>
      <ProFormSelect
        options={[
          {
            value: 'select',
            label: '选择框',
          },
          {
            value: 'input',
            label: '输入框',
          },
        ]}
        width="xs"
        name="globalUseMode"
        label="全局生效方式组件的类型"
      />
      <ProFormList
        name={['default', 'users']}
        label="用户信息"
        initialValue={[
          {
            name: '1111',
          },
        ]}
        alwaysShowItemLabel
      >
        <ProForm.Group key="group">
          <ProFormSelect
            options={[
              {
                value: 'select',
                label: '选择框',
              },
              {
                value: 'input',
                label: '输入框',
              },
            ]}
            width="xs"
            name="useMode"
            label="生效方式组件的类型"
          />
          <ProFormDependency name={['useMode']}>
            {({ useMode }) => {
              if (useMode === 'select') {
                return (
                  <ProFormSelect
                    options={[
                      {
                        value: 'chapter',
                        label: '盖章后生效',
                      },
                    ]}
                    width="md"
                    name="function"
                    label="生效方式"
                  />
                );
              }
              return (
                <ProFormText width="md" name="function" label="生效方式" />
              );
            }}
          </ProFormDependency>

          <ProFormDependency
            key="globalUseMode"
            name={['globalUseMode']}
            ignoreFormListField
          >
            {({ globalUseMode }) => {
              if (globalUseMode === 'select') {
                return (
                  <ProFormSelect
                    options={[
                      {
                        value: 'chapter',
                        label: '盖章后生效',
                      },
                    ]}
                    width="md"
                    name="gfunction"
                    label="外层联动生效方式"
                  />
                );
              }
              return (
                <ProFormText
                  width="md"
                  name="gfunction"
                  label="外层联动生效方式"
                />
              );
            }}
          </ProFormDependency>
        </ProForm.Group>
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
