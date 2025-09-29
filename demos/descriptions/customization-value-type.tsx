import { ProDescriptions, ProProvider } from '@xxlabs/pro-components';
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
const tableListDataSource: TableListItem = {
  key: 1,
  name: `TradeCode 1`,
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
    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue }];
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
        size="small"
        style={{ width: 78 }}
        type="text"
        value={inputValue}
        onBlur={handleInputConfirm}
        onChange={handleInputChange}
        onPressEnter={handleInputConfirm}
      />
    </Space>
  );
};

export default () => {
  const values = useContext(ProProvider);
  return (
    <>
      <ProProvider.Provider
        value={{
          ...values,
          valueTypeMap: {
            link: {
              render: (text) => <a>{text}</a>,
              formItemRender: (text, props) => <Input placeholder="请输入链接" {...props?.fieldProps} />,
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
              formItemRender: (text, props) => <TagList {...props} {...props?.fieldProps} />,
            },
          },
        }}
      >
        <ProDescriptions<TableListItem, 'link' | 'tags'>
          columns={[
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
                    action?.reload();
                  }}
                >
                  刷新
                </a>,
              ],
            },
          ]}
          editable={{}}
          request={() => {
            return Promise.resolve({
              data: tableListDataSource,
              success: true,
            });
          }}
          title="自定义 valueType"
        />
      </ProProvider.Provider>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProDescriptions 自定义 ValueType Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 描述列表标题
          </li>
          <li>
            <strong>columns</strong>: 列配置数组
          </li>
          <li>
            <strong>editable</strong>: 可编辑配置
          </li>
          <li>
            <strong>request</strong>: 异步请求函数
          </li>
        </ul>
        <h4>ProProvider 配置：</h4>
        <ul>
          <li>
            <strong>valueTypeMap</strong>: 自定义 valueType 映射表
          </li>
          <li>
            <strong>render</strong>: 自定义渲染函数
          </li>
          <li>
            <strong>formItemRender</strong>: 表单项渲染函数
          </li>
        </ul>
        <h4>自定义 ValueType 配置：</h4>
        <ul>
          <li>
            <strong>link</strong>: 自定义链接类型
          </li>
          <li>
            <strong>tags</strong>: 自定义标签类型
          </li>
          <li>
            <strong>render 函数</strong>: 定义如何渲染数据
          </li>
          <li>
            <strong>formItemRender 函数</strong>: 定义编辑时的表单组件
          </li>
        </ul>
        <h4>TagList 组件特点：</h4>
        <ul>
          <li>
            <strong>动态添加</strong>: 支持动态添加新标签
          </li>
          <li>
            <strong>输入验证</strong>: 防止重复标签
          </li>
          <li>
            <strong>键盘交互</strong>: 支持回车和失焦确认
          </li>
          <li>
            <strong>状态管理</strong>: 管理输入状态和标签列表
          </li>
        </ul>
        <h4>Column 配置：</h4>
        <ul>
          <li>
            <strong>title</strong>: 列标题
          </li>
          <li>
            <strong>dataIndex</strong>: 数据字段名
          </li>
          <li>
            <strong>valueType</strong>: 使用自定义的 valueType
          </li>
          <li>
            <strong>render</strong>: 自定义渲染函数，支持 action 参数
          </li>
        </ul>
        <h4>Render 函数参数：</h4>
        <ul>
          <li>
            <strong>text</strong>: 当前字段的值
          </li>
          <li>
            <strong>row</strong>: 当前行数据
          </li>
          <li>
            <strong>index</strong>: 行索引
          </li>
          <li>
            <strong>action</strong>: 操作对象，包含 reload 等方法
          </li>
        </ul>
        <h4>类型定义：</h4>
        <ul>
          <li>
            <strong>TableListItem</strong>: 表格数据项类型
          </li>
          <li>
            <strong>泛型支持</strong>: ProDescriptions&lt;TableListItem, 'link' | 'tags'&gt;
          </li>
          <li>
            <strong>类型安全</strong>: 提供完整的类型检查
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>自定义组件</strong>: 需要特殊的展示组件
          </li>
          <li>
            <strong>复杂交互</strong>: 需要复杂的用户交互
          </li>
          <li>
            <strong>业务定制</strong>: 根据业务需求定制展示方式
          </li>
          <li>
            <strong>编辑功能</strong>: 需要自定义编辑组件
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>组件封装</strong>: 将复杂的自定义组件封装为独立组件
          </li>
          <li>
            <strong>类型定义</strong>: 为自定义组件定义完整的类型
          </li>
          <li>
            <strong>状态管理</strong>: 合理管理组件的内部状态
          </li>
          <li>
            <strong>交互设计</strong>: 提供清晰的用户交互反馈
          </li>
        </ul>
      </div>
    </>
  );
};
