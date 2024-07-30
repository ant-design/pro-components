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
      <ProFormList
        name={['default', 'users']}
        label="用户信息"
        initialValue={[
          {
            name: '我是姓名',
          },
        ]}
        itemContainerRender={(doms) => {
          return <ProForm.Group>{doms}</ProForm.Group>;
        }}
      >
        {(f, index, action) => {
          console.log(f, index, action);
          return (
            <>
              <ProFormText
                initialValue={index}
                name="rowKey"
                label={`第 ${index} 配置`}
              />
              <ProFormText name="name" label="姓名" />
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
                  return <ProFormText name="remark" label="昵称详情" />;
                }}
              </ProFormDependency>
              <ProFormSelect
                name="addr"
                width="md"
                label="与 name 联动的选择器"
                dependencies={['name']}
                request={async (params) => [
                  { label: params.name, value: 'all' },
                  { label: 'Unresolved', value: 'open' },
                  { label: 'Resolved', value: 'closed' },
                  { label: 'Resolving', value: 'processing' },
                ]}
              />
            </>
          );
        }}
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
