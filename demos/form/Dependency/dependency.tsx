import { ProForm, ProFormDependency, ProFormList, ProFormSelect, ProFormText } from '@xxlabs/pro-components';

const Demo = () => {
  return (
    <ProForm>
      <ProFormSelect
        label="全局生效方式组件的类型"
        name="globalUseMode"
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
      />
      <ProFormList
        alwaysShowItemLabel
        initialValue={[
          {
            name: '1111',
          },
        ]}
        label="用户信息"
        name={['default', 'users']}
      >
        <ProForm.Group key="group">
          <ProFormSelect
            label="生效方式组件的类型"
            name="useMode"
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
          />
          <ProFormDependency name={['useMode']}>
            {({ useMode }) => {
              if (useMode === 'select') {
                return (
                  <ProFormSelect
                    label="生效方式"
                    name="function"
                    options={[
                      {
                        value: 'chapter',
                        label: '盖章后生效',
                      },
                    ]}
                    width="md"
                  />
                );
              }
              return <ProFormText label="生效方式" name="function" width="md" />;
            }}
          </ProFormDependency>

          <ProFormDependency key="globalUseMode" ignoreFormListField name={['globalUseMode']}>
            {({ globalUseMode }) => {
              if (globalUseMode === 'select') {
                return (
                  <ProFormSelect
                    label="外层联动生效方式"
                    name="gfunction"
                    options={[
                      {
                        value: 'chapter',
                        label: '盖章后生效',
                      },
                    ]}
                    width="md"
                  />
                );
              }
              return <ProFormText label="外层联动生效方式" name="gfunction" width="md" />;
            }}
          </ProFormDependency>
        </ProForm.Group>
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
