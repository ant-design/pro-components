import type {
  ActionType,
  EditableFormInstance,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProForm } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';

type DataSourceType = {
  id: React.Key;
  associate?: string;
};

const defaultData: DataSourceType[] = [];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const formRef = useRef<ProFormInstance<any>>();
  const actionRef = useRef<ActionType>();
  const editableFormRef = useRef<EditableFormInstance>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '关联题库',
      dataIndex: 'associate',
      valueType: 'text',
      ellipsis: true,
      formItemProps: {
        rules: [{ required: true, message: 'Required' }],
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, row) => [
        <a
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue(
              'table',
            ) as DataSourceType[];
            formRef.current?.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== row?.id),
            });
          }}
        >
          移除
        </a>,
        <a
          key="edit"
          onClick={() => {
            actionRef.current?.startEditable(row.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <ProCard>
      <div
        style={{
          maxWidth: 800,
          margin: 'auto',
        }}
      >
        <ProForm<{
          table: DataSourceType[];
        }>
          formRef={formRef}
          initialValues={{
            table: defaultData,
          }}
        >
          <EditableProTable<DataSourceType>
            rowKey="id"
            scroll={{
              x: true,
            }}
            editableFormRef={editableFormRef}
            controlled
            actionRef={actionRef}
            formItemProps={{
              label: '题库编辑',
            }}
            maxLength={10}
            name="table"
            columns={columns}
            recordCreatorProps={{
              record: (index) => {
                return { id: index + 1 };
              },
            }}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
            }}
          />
        </ProForm>
      </div>
    </ProCard>
  );

  <div
    style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
    }}
  >
    <h4>EditableProTable 规则 Props 说明：</h4>
    <ul>
      <li>
        <strong>EditableProTable</strong>: 可编辑专业表格组件
      </li>
      <li>
        <strong>ProCard</strong>: 专业卡片组件
      </li>
      <li>
        <strong>ProForm</strong>: 专业表单组件
      </li>
      <li>
        <strong>编辑规则</strong>: 展示编辑规则功能
      </li>
    </ul>
    <h4>EditableProTable 配置：</h4>
    <ul>
      <li>
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>scroll</strong>: 滚动配置
      </li>
      <li>
        <strong>editableFormRef</strong>: 可编辑表单引用
      </li>
      <li>
        <strong>controlled</strong>: 受控模式
      </li>
      <li>
        <strong>actionRef</strong>: 操作引用
      </li>
      <li>
        <strong>formItemProps</strong>: 表单项属性
      </li>
      <li>
        <strong>maxLength</strong>: 最大长度
      </li>
      <li>
        <strong>name</strong>: 字段名称
      </li>
      <li>
        <strong>columns</strong>: 列配置
      </li>
      <li>
        <strong>recordCreatorProps</strong>: 记录创建属性
      </li>
      <li>
        <strong>editable</strong>: 可编辑配置
      </li>
    </ul>
    <h4>编辑规则特点：</h4>
    <ul>
      <li>
        <strong>表单验证</strong>: 支持表单验证
      </li>
      <li>
        <strong>必填校验</strong>: 支持必填校验
      </li>
      <li>
        <strong>多行编辑</strong>: 支持多行编辑
      </li>
      <li>
        <strong>动态添加</strong>: 支持动态添加
      </li>
      <li>
        <strong>行内编辑</strong>: 支持行内编辑
      </li>
      <li>
        <strong>数据控制</strong>: 支持数据控制
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>数据编辑</strong>: 数据编辑需求
      </li>
      <li>
        <strong>表单管理</strong>: 表单管理系统
      </li>
      <li>
        <strong>配置管理</strong>: 配置管理功能
      </li>
    </ul>
  </div>;
};
