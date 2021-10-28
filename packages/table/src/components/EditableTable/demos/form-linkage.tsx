import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormDigit, ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormDependency } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

type DataSourceType = {
  id: React.Key;
  associate?: string;
  questionsNum?: number;
  type?: string;
  fraction?: number;
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    associate: '题库名称一',
    questionsNum: 10,
    type: 'multiple',
    fraction: 20,
  },
  {
    id: 624691229,
    associate: '题库名称二',
    questionsNum: 10,
    type: 'radio',
    fraction: 20,
  },
  {
    id: 624748503,
    associate: '题库名称三',
    questionsNum: 10,
    type: 'judge',
    fraction: 20,
  },
  {
    id: 624691220,
    associate: '题库名称四',
    questionsNum: 10,
    type: 'vacant',
    fraction: 20,
  },
];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map(({ id }) => id),
  );
  const formRef = useRef<ProFormInstance<any>>();
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '关联题库',
      dataIndex: 'associate',
      valueType: 'text',
      ellipsis: true,
    },
    {
      title: '题型',
      key: 'type',
      dataIndex: 'type',
      valueType: 'select',
      editable: false,
      valueEnum: {
        multiple: { text: '多选题', status: 'Default' },
        radio: { text: '单选题', status: 'Warning' },
        vacant: {
          text: '填空题',
          status: 'Error',
        },
        judge: {
          text: '判断题',
          status: 'Success',
        },
      },
    },
    {
      title: '题数',
      dataIndex: 'questionsNum',
      valueType: 'digit',
    },
    {
      title: '分值',
      dataIndex: 'fraction',
      valueType: 'digit',
    },
    {
      title: '操作',
      valueType: 'option',
    },
  ];

  return (
    <ProCard>
      <div
        style={{
          maxWidth: 780,
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
          layout="inline"
        >
          <ProFormDependency name={['table']}>
            {({ table }) => {
              const info = (table as DataSourceType[]).reduce(
                (pre, item) => {
                  return {
                    totalScore: pre.totalScore + (item?.fraction || 0),
                    questions: pre.questions + (item?.questionsNum || 0),
                  };
                },
                { totalScore: 0, questions: 0 },
              );
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: 16,
                  }}
                >
                  <div style={{ flex: 1 }}>总分：{info.totalScore}</div>
                  <div style={{ flex: 1 }}>题数：{info.questions}</div>
                  <div style={{ flex: 2 }}>
                    <ProFormDigit label="及格分" />
                  </div>
                  <div style={{ flex: 2 }}>
                    <ProFormDigit label="考试时间(分钟)" />
                  </div>
                </div>
              );
            }}
          </ProFormDependency>
          <EditableProTable<DataSourceType>
            rowKey="id"
            actionRef={actionRef}
            headerTitle="可编辑表格"
            maxLength={5}
            name="table"
            columns={columns}
            editable={{
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
              actionRender: (row) => {
                return [
                  <a
                    key="delete"
                    onClick={() => {
                      const tableDataSource = formRef.current?.getFieldValue(
                        'table',
                      ) as DataSourceType[];
                      formRef.current?.setFieldsValue({
                        table: tableDataSource.filter((item) => item.id !== row.id),
                      });
                    }}
                  >
                    移除
                  </a>,
                ];
              },
            }}
          />
        </ProForm>
      </div>
    </ProCard>
  );
};
