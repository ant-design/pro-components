import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { mount, shallow } from 'enzyme';
import { useRef, useState } from 'react';

export type TableListItem = {
  key: number;
  name: string;
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
  },
];

// demo
const ProTableSpinDemo = () => {
  const ref = useRef<ProFormInstance>();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState({ spinning: true, delay: 1000 });
  return (
    <ProTable<TableListItem>
      columns={columns}
      loading={loading}
      request={() =>
        Promise.resolve({
          data: [
            {
              key: 1,
              name: `TradeCode ${1}`,
              createdAt: new Date(),
            },
          ],
          success: true,
        })
      }
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      search={{
        collapsed,
        onCollapse: setCollapsed,
      }}
      formRef={ref}
      toolBarRender={() => [
        <Button
          key="set"
          onClick={() => {
            if (ref.current) {
              ref.current.setFieldsValue({
                name: 'test-xxx',
              });
            }
          }}
        >
          赋值
        </Button>,
        <Button
          key="submit"
          onClick={() => {
            if (ref.current) {
              ref.current.submit();
            }
          }}
        >
          提交
        </Button>,
      ]}
      postData={(data) => {
        console.log(data, 'fuck');
        setTimeout(() => {
          setLoading({
            ...loading,
            spinning: false,
          });
        }, 3000);
        return data;
      }}
      options={false}
      dateFormatter="string"
      headerTitle="表单赋值"
    />
  );
};

export default ProTableSpinDemo;

describe('ProTable 组件测试', () => {
  it('ProTable 渲染正常', () => {
    const ProTableSpinComp = require('../../packages/table/src/index').default;
    const componentWrapper = shallow(<ProTableSpinComp />);
    expect(componentWrapper.html()).toMatchSnapshot();
  });

  it('ProTable 传入object 渲染正常', () => {
    const ProTableSpinComp = require('../../packages/table/src/index').default;
    const state = { spinning: true, delay: 1000 };
    const html = mount(
      <ProTableSpinComp
        loading={state}
        postData={(data: any) => {
          setTimeout(() => {
            html.setState({ loading: { ...state, spinning: false } });
          }, 3000);
          return data;
        }}
      />,
    );
  });

  it('ProTable loading boolean 原逻辑不变 渲染正常', () => {
    const ProTableSpinComp = require('../../packages/table/src/index').default;
    const componentWrapper = shallow(<ProTableSpinComp loading={true} />);
    expect(componentWrapper.html()).toMatchSnapshot();
  });
});
