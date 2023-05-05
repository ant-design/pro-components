import type { ProFormColumnsType } from '@ant-design/pro-components';
import { ProConfigProvider } from '@ant-design/pro-components';
import {
  BetaSchemaForm,
  ProCard,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import type { InputRef } from 'antd';
import { Input, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';

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

const columns: ProFormColumnsType<TableListItem, 'link' | 'tags'>[] = [
  {
    title: '标签',
    valueType: 'group',
    columns: [
      {
        title: '只读链接',
        readonly: true,
        dataIndex: 'name',
        valueType: 'link',
      },
      {
        title: '链接',
        dataIndex: 'name',
        valueType: 'link',
      },
    ],
  },
  {
    title: '路径',
    valueType: 'group',
    columns: [
      {
        title: '标签',
        dataIndex: 'status',
        key: 'status',
        valueType: 'tags',
      },
      {
        title: '只读标签',
        readonly: true,
        dataIndex: 'status',
        key: 'status',
        valueType: 'tags',
      },
    ],
  },
];

const tableColumns = [
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
];

const initialValue = {
  key: 1,
  name: `TradeCode 1`,
  status: [
    {
      value: Math.floor(Math.random() * 10),
      label: valueEnum[Math.floor(Math.random() * 10) % 4],
    },
    {
      value: Math.floor(Math.random() * 10),
      label: valueEnum[Math.floor(Math.random() * 10) % 4],
    },
  ],
};

export default () => {
  return (
    <ProConfigProvider
      valueTypeMap={{
        link: {
          render: (text) => <a>{text}</a>,
          renderFormItem: (text, props) => (
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
          renderFormItem: (text, props) => (
            <TagList {...props} {...props?.fieldProps} />
          ),
        },
      }}
      hashed={false}
    >
      <ProCard
        title="SchemaForm"
        bordered
        style={{
          marginBlockEnd: 24,
        }}
      >
        <BetaSchemaForm<TableListItem, 'link' | 'tags'>
          initialValues={initialValue}
          columns={columns}
          title="自定义 valueType"
        />
      </ProCard>
      <ProCard
        title="ProTable"
        bordered
        style={{
          marginBlockEnd: 24,
        }}
      >
        <ProTable
          columns={tableColumns}
          pagination={false}
          toolBarRender={false}
          dataSource={[initialValue]}
        />
      </ProCard>
      <ProCard
        title="ProDescriptions"
        bordered
        style={{
          marginBlockEnd: 24,
        }}
      >
        <ProDescriptions columns={tableColumns} dataSource={initialValue} />
      </ProCard>
    </ProConfigProvider>
  );
};
