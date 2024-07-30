import {
  ProForm,
  ProFormDependency,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { Button } from 'antd';

const Demo = () => {
  return (
    <ProForm>
      <ProFormList
        name={['default', 'users']}
        label="用户信息"
        initialValue={[
          {
            name: '1111',
          },
        ]}
        itemContainerRender={(doms) => {
          return <ProForm.Group>{doms}</ProForm.Group>;
        }}
        alwaysShowItemLabel
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
              <ProFormText name="name" key="name" label="姓名" />
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
                  return <ProFormText name="remark" label="昵称详情" />;
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
                  type="primary"
                  key="SET"
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
                  type="dashed"
                  key="clear"
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
