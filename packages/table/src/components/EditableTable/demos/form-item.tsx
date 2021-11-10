import React, { useRef, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormRadio, ProFormField, ProFormDependency } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: '624748504',
    title: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
    update_at: '2020-05-26T09:42:56Z',
  },
  {
    id: '624691229',
    title: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '2020-05-26T08:19:22Z',
    update_at: '2020-05-26T08:19:22Z',
  },
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
  const formRef = useRef<ProFormInstance<any>>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 2 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
      // 第二行不允许编辑
      editable: (text, record, index) => {
        return index !== 0;
      },
      width: '30%',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
      fieldProps: (from, { rowKey, rowIndex }) => {
        if (from.getFieldValue(['table', rowKey || '', 'title']) === '不好玩') {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: '活动时间',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue('table') as DataSourceType[];
            formRef.current?.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== record.id),
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
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
        headerTitle="可编辑表格"
        maxLength={5}
        name="table"
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
            : false
        }
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: '添加到顶部',
                value: 'top',
              },
              {
                label: '添加到底部',
                value: 'bottom',
              },
              {
                label: '隐藏',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableRowKeys,
        }}
      />
      <ProForm.Item>
        <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
          <ProFormDependency name={['table']}>
            {({ table }) => {
              return (
                <ProFormField
                  ignoreFormItem
                  fieldProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  mode="read"
                  valueType="jsonCode"
                  text={JSON.stringify(table)}
                />
              );
            }}
          </ProFormDependency>
        </ProCard>
      </ProForm.Item>
    </ProForm>
  );
};
