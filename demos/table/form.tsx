import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
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
    valueType: 'date',
  },
];

export default () => {
  const ref = useRef<ProFormInstance>();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ProTable<TableListItem>
      columns={columns}
      request={() =>
        Promise.resolve({
          data: [
            {
              key: 1,
              name: `TradeCode ${1}`,
              createdAt: 1602572994055,
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
      options={false}
      dateFormatter="string"
      headerTitle="表单赋值"
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
    <h4>ProTable 表单 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>Button</strong>: 按钮组件
      </li>
      <li>
        <strong>表单</strong>: 展示表单功能
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
        <strong>pagination</strong>: 分页配置
      </li>
      <li>
        <strong>search</strong>: 搜索配置
      </li>
      <li>
        <strong>formRef</strong>: 表单引用
      </li>
      <li>
        <strong>toolBarRender</strong>: 工具栏渲染
      </li>
      <li>
        <strong>options</strong>: 选项配置
      </li>
      <li>
        <strong>dateFormatter</strong>: 日期格式化
      </li>
      <li>
        <strong>headerTitle</strong>: 表格标题
      </li>
    </ul>
    <h4>表单特点：</h4>
    <ul>
      <li>
        <strong>表单引用</strong>: 支持表单引用
      </li>
      <li>
        <strong>字段赋值</strong>: 支持字段赋值
      </li>
      <li>
        <strong>表单提交</strong>: 支持表单提交
      </li>
      <li>
        <strong>折叠控制</strong>: 支持折叠控制
      </li>
      <li>
        <strong>工具栏操作</strong>: 支持工具栏操作
      </li>
      <li>
        <strong>表单控制</strong>: 支持表单控制
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>表单管理</strong>: 表单管理需求
      </li>
      <li>
        <strong>数据操作</strong>: 数据操作功能
      </li>
      <li>
        <strong>交互控制</strong>: 交互控制需求
      </li>
    </ul>
  </div>;
};
