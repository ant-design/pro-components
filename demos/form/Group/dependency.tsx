import { ProForm, ProFormDependency, ProFormList, ProFormSelect, ProFormText } from '@xxlabs/pro-components';

const Demo = () => {
  return (
    <ProForm>
      <ProFormList
        initialValue={[
          {
            name: '我是姓名',
          },
        ]}
        itemContainerRender={(doms) => {
          return <ProForm.Group>{doms}</ProForm.Group>;
        }}
        label="用户信息"
        name={['default', 'users']}
      >
        {(f, index, action) => {
          console.log(f, index, action);
          return (
            <>
              <ProFormText initialValue={index} label={`第 ${index} 配置`} name="rowKey" />
              <ProFormText label="姓名" name="name" />
              <ProFormDependency name={['name']}>
                {({ name }) => {
                  if (!name) {
                    return (
                      <span
                        style={{
                          lineHeight: '32px',
                        }}
                      >
                        输入姓名展示
                      </span>
                    );
                  }
                  return <ProFormText label="昵称详情" name="remark" />;
                }}
              </ProFormDependency>
              <ProFormSelect
                dependencies={['name']}
                label="与 name 联动的选择器"
                name="addr"
                request={async (params) => [
                  { label: params.name, value: 'all' },
                  { label: 'Unresolved', value: 'open' },
                  { label: 'Resolved', value: 'closed' },
                  { label: 'Resolving', value: 'processing' },
                ]}
                width="md"
              />
            </>
          );
        }}
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
