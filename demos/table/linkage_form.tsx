/* eslint-disable no-console */ import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';

type ServiceItem = {
  key: number;
  name: string;
  createdAt: number;
};

const MySelect: React.FC<{
  state: {
    type: number;
  };
  value?: string;
  onChange?: (value: string) => void;
}> = (props) => {
  const { state } = props;

  const [innerOptions, setOptions] = useState<
    {
      label: React.ReactNode;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    const { type } = state || {};
    if (type === 2) {
      setOptions([
        { label: '星期一', value: 1 },
        { label: '星期二', value: 2 },
      ]);
    } else {
      setOptions([
        { label: '一月', value: 1 },
        { label: '二月', value: 2 },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(state)]);

  return (
    <Select
      options={innerOptions}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

const Demo = () => {
  const columns: ProColumns<ServiceItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: '服务名称',
      dataIndex: 'name',
    },
    {
      title: '动态表单',
      key: 'direction',
      hideInTable: true,
      dataIndex: 'direction',
      formItemRender: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        const stateType = form.getFieldValue('state');
        if (stateType === 3) {
          return <Input />;
        }
        if (stateType === 4) {
          return null;
        }
        return (
          <MySelect
            {...rest}
            state={{
              type: stateType,
            }}
          />
        );
      },
    },
    {
      title: '查询周期',
      dataIndex: 'state',
      initialValue: 1,
      valueType: 'select',
      request: async () => [
        { label: '按月', value: 1 },
        { label: '按周', value: 2 },
        { label: '自定义', value: 3 },
        { label: '不展示', value: 4 },
      ],
    },
  ];

  return (
    <ProTable<ServiceItem>
      columns={columns}
      request={async (params) => {
        console.log(`request params:`, params);
        return {
          data: [
            {
              key: 1,
              name: '用户认证服务',
              createdAt: 1705286400000,
              state: 'closed',
            },
          ],
          success: true,
        };
      }}
      rowKey="key"
      tableLayout="fixed"
      dateFormatter="string"
      headerTitle="动态联动搜索栏"
      search={{
        defaultCollapsed: false,
        optionRender: (searchConfig, formProps, dom) => [
          ...dom.reverse(),
          <Button
            key="export"
            onClick={() => {
              const values = searchConfig?.form?.getFieldsValue();
              console.log(values);
            }}
          >
            导出
          </Button>,
        ],
      }}
      toolBarRender={() => [
        <Button key="new" type="primary">
          <PlusOutlined />
          新建
        </Button>,
      ]}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
