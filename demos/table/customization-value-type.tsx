import type { ProColumns } from '@ant-design/pro-components';
import { ProProvider, ProTable } from '@ant-design/pro-components';
import type { InputRef } from 'antd';
import { Input, Space, Tag } from 'antd';
import React, { useContext, useRef, useState } from 'react';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  status: {
    label: string | number;
    value: number;
  }[];
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    status: [
      {
        value: Math.floor(Math.random() * 10),
        label: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
      },
      {
        value: Math.floor(Math.random() * 10),
        label: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
      },
    ],
  });
}

const TagList: React.FC<{
  value?: {
    key: string;
    label: string;
  }[];
  onChange?: (
    value: {
      key: string;
      label: string;
    }[],
  ) => void;
}> = ({ value, onChange }) => {
  const ref = useRef<InputRef | null>(null);
  const [newTags, setNewTags] = useState<
    {
      key: string;
      label: string;
    }[]
  >([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...(value || [])];
    if (
      inputValue &&
      tempsTags.filter((tag) => tag.label === inputValue).length === 0
    ) {
      tempsTags = [
        ...tempsTags,
        { key: `new-${tempsTags.length}`, label: inputValue },
      ];
    }
    onChange?.(tempsTags);
    setNewTags([]);
    setInputValue('');
  };

  return (
    <Space>
      {(value || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      <Input
        ref={ref}
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    </Space>
  );
};

const columns: ProColumns<TableListItem, 'link' | 'tags'>[] = [
  {
    title: '链接',
    dataIndex: 'name',
    valueType: 'link',
  },
  {
    title: '标签',
    dataIndex: 'status',
    key: 'status',
    valueType: 'tags',
  },
  {
    title: '操作',
    key: 'option',
    valueType: 'option',
    render: (_, row, index, action) => [
      <a
        key="a"
        onClick={() => {
          action?.startEditable(row.key);
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default () => {
  const values = useContext(ProProvider);
  return (
    <ProProvider.Provider
      value={{
        ...values,
        valueTypeMap: {
          link: {
            render: (text) => <a>{text}</a>,
            formItemRender: (text, props) => (
              <Input placeholder="请输入链接" {...props?.fieldProps} />
            ),
          },
          tags: {
            render: (text) => {
              return (
                <>
                  {[text].flat(1).map((item) => (
                    <Tag key={item.value}>{item.label}</Tag>
                  ))}
                </>
              );
            },
            formItemRender: (text, props) => (
              <TagList {...props} {...props?.fieldProps} />
            ),
          },
        },
      }}
    >
      <ProTable<TableListItem, Record<string, any>, 'link' | 'tags'>
        columns={columns}
        request={() => {
          return Promise.resolve({
            total: 200,
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="key"
        headerTitle="自定义 valueType"
      />
    </ProProvider.Provider>
  );

  <div
    style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
    }}
  >
    <h4>ProTable 自定义值类型 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>ProProvider</strong>: 专业提供者组件
      </li>
      <li>
        <strong>Input</strong>: 输入框组件
      </li>
      <li>
        <strong>Tag</strong>: 标签组件
      </li>
      <li>
        <strong>自定义值类型</strong>: 展示自定义值类型功能
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
        <strong>headerTitle</strong>: 表格标题
      </li>
    </ul>
    <h4>自定义值类型特点：</h4>
    <ul>
      <li>
        <strong>valueTypeMap</strong>: 值类型映射
      </li>
      <li>
        <strong>自定义渲染</strong>: 支持自定义渲染
      </li>
      <li>
        <strong>表单项渲染</strong>: 支持表单项渲染
      </li>
      <li>
        <strong>链接类型</strong>: 支持链接类型
      </li>
      <li>
        <strong>标签类型</strong>: 支持标签类型
      </li>
      <li>
        <strong>可编辑</strong>: 支持可编辑功能
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>自定义展示</strong>: 自定义展示需求
      </li>
      <li>
        <strong>特殊数据类型</strong>: 特殊数据类型处理
      </li>
      <li>
        <strong>业务定制</strong>: 业务定制需求
      </li>
    </ul>
  </div>
};
