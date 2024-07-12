import type {
  EditableFormInstance,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormField,
  ProFormSegmented,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  update_at?: number;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: '624748504',
    title: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: 1590486176000,
    update_at: 1590486176000,
  },
  {
    id: '624691229',
    title: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: 1590481162000,
    update_at: 1590481162000,
  },
];

let i = 0;

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
    'bottom',
  );
  const [controlled, setControlled] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance<any>>();
  const editorFormRef = useRef<EditableFormInstance<DataSourceType>>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
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
            action?.startEditable?.(record.id, record);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue(
              'table',
            ) as DataSourceType[];
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
      validateTrigger="onBlur"
    >
      <EditableProTable<DataSourceType>
        rowKey="id"
        scroll={{
          x: 960,
        }}
        editableFormRef={editorFormRef}
        headerTitle="可编辑表格"
        maxLength={5}
        name="table"
        controlled={controlled}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
            : false
        }
        toolBarRender={() => [
          <ProFormSwitch
            key="render"
            fieldProps={{
              style: {
                marginBlockEnd: 0,
              },
              checked: controlled,
              onChange: (value) => {
                setControlled(value);
              },
            }}
            checkedChildren="数据更新通知 Form"
            unCheckedChildren="保存后通知 Form"
            noStyle
          />,
          <ProFormSegmented
            key="render"
            fieldProps={{
              style: {
                marginBlockEnd: 0,
              },
              value: position,
              onChange: (value) => {
                setPosition(value as 'top');
              },
            }}
            noStyle
            request={async () => [
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
          <Button
            key="rows"
            onClick={() => {
              const rows = editorFormRef.current?.getRowsData?.();
              console.log(rows);
            }}
          >
            获取 table 的数据
          </Button>,
        ]}
        columns={columns}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableRowKeys,
          actionRender: (row, config, defaultDom) => {
            return [
              defaultDom.save,
              defaultDom.delete,
              defaultDom.cancel,
              <a
                key="set"
                onClick={() => {
                  console.log(config.index);
                  i++;
                  editorFormRef.current?.setRowData?.(config.index!, {
                    title: '动态设置的title' + i,
                  });
                }}
              >
                动态设置此项
              </a>,
            ];
          },
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
