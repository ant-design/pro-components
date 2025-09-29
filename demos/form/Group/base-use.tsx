import { ProForm, ProFormDependency, ProFormList, ProFormText } from '@xxlabs/pro-components';
import { Button } from 'antd';

const Demo = () => {
  return (
    <ProForm>
      <ProFormList
        alwaysShowItemLabel
        initialValue={[
          {
            name: '1111',
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
              <ProFormText key="name" label="姓名" name="name" />
              <ProFormDependency key="remark" name={['name']}>
                {({ name }) => {
                  if (!name) {
                    return (
                      <span
                        style={{
                          lineHeight: '92px',
                        }}
                      >
                        输入姓名展示
                      </span>
                    );
                  }
                  return <ProFormText label="昵称详情" name="remark" />;
                }}
              </ProFormDependency>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '8px',
                  height: 60,
                }}
              >
                <Button
                  key="SET"
                  type="primary"
                  onClick={() => {
                    action.setCurrentRowData({
                      name: 'New Name' + index,
                      remark: 'New Remark' + index,
                    });
                  }}
                >
                  设置此项
                </Button>

                <Button
                  key="clear"
                  type="dashed"
                  onClick={() => {
                    action.setCurrentRowData({
                      name: undefined,
                      remark: undefined,
                    });
                  }}
                >
                  清空此项
                </Button>
              </div>
            </>
          );
        }}
      </ProFormList>
    </ProForm>
  );
};

export default Demo;
