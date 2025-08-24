/* eslint-disable no-console */ import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';

type GithubIssueItem = {
  key: number;
  name: string;
  createdAt: number;
};

const MySelect: React.FC<{
  state: {
    type: number;
  };
  /** Value 和 onChange 会被自动注入 */
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
        {
          label: '星期一',
          value: 1,
        },
        {
          label: '星期二',
          value: 2,
        },
      ]);
    } else {
      setOptions([
        {
          label: '一月',
          value: 1,
        },
        {
          label: '二月',
          value: 2,
        },
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

export default () => {
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: '标题',
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
      title: '状态',
      dataIndex: 'state',
      initialValue: 1,
      valueType: 'select',
      request: async () => [
        {
          label: '月份',
          value: 1,
        },
        {
          label: '周',
          value: 2,
        },
        {
          label: '自定义',
          value: 3,
        },
        {
          label: '不展示',
          value: 4,
        },
      ],
    },
  ];

  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      request={async (params) => {
        console.log(`request params:`, params);
        return {
          data: [
            {
              key: 1,
              name: `TradeCode ${1}`,
              createdAt: 1602572994055,
              state: 'closed',
            },
          ],
          success: true,
        };
      }}
      rowKey="key"
      tableLayout="fixed"
      dateFormatter="string"
      headerTitle="动态自定义搜索栏"
      search={{
        defaultCollapsed: false,
        optionRender: (searchConfig, formProps, dom) => [
          ...dom.reverse(),
          <Button
            key="out"
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
        <Button key="3" type="primary">
          <PlusOutlined />
          新建
        </Button>,
      ]}
    />
  );

  <div
    style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
    }}
  >
    <h4>ProTable 联动表单 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>Button</strong>: 按钮组件
      </li>
      <li>
        <strong>Input</strong>: 输入框组件
      </li>
      <li>
        <strong>Select</strong>: 选择器组件
      </li>
      <li>
        <strong>联动表单</strong>: 展示联动表单功能
      </li>
    </ul>
    <h4>ProTable 配置：</h4>
    <ul>
      <li>
        <strong>columns</strong>: 列配置
      </li>
      <li>
        <strong>request</strong>: 请求函数
      </li>
      <li>
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>tableLayout</strong>: 表格布局
      </li>
      <li>
        <strong>dateFormatter</strong>: 日期格式化
      </li>
      <li>
        <strong>headerTitle</strong>: 表格标题
      </li>
      <li>
        <strong>search</strong>: 搜索配置
      </li>
      <li>
        <strong>toolBarRender</strong>: 工具栏渲染
      </li>
    </ul>
    <h4>联动表单特点：</h4>
    <ul>
      <li>
        <strong>动态表单</strong>: 支持动态表单
      </li>
      <li>
        <strong>条件渲染</strong>: 支持条件渲染
      </li>
      <li>
        <strong>表单联动</strong>: 支持表单联动
      </li>
      <li>
        <strong>自定义组件</strong>: 支持自定义组件
      </li>
      <li>
        <strong>状态管理</strong>: 支持状态管理
      </li>
      <li>
        <strong>选项渲染</strong>: 支持选项渲染
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>复杂表单</strong>: 复杂表单需求
      </li>
      <li>
        <strong>动态配置</strong>: 动态配置功能
      </li>
      <li>
        <strong>条件展示</strong>: 条件展示需求
      </li>
    </ul>
  </div>;
};
