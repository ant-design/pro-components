import type {
  ActionType,
  EditableFormInstance,
} from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProTable,
} from '@ant-design/pro-components';
import { Alert, Button, Space, Tabs, Typography, message } from 'antd';
import { useRef, useState } from 'react';

type Row = {
  id: number;
  name: string;
  status?: 'active' | 'closed';
  sort?: number;
};

const rows: Row[] = [
  { id: 1, name: 'Alpha', status: 'active' },
  { id: 2, name: 'Beta', status: 'closed' },
  { id: 3, name: 'Gamma', status: 'active' },
];

const CursorPagination = () => (
  <ProTable<Row>
    rowKey="id"
    search={false}
    options={false}
    columns={[
      { title: 'ID', dataIndex: 'id' },
      { title: '名称', dataIndex: 'name' },
    ]}
    pagination={{ type: 'cursor', pageSize: 1 }}
    request={async ({ nextToken }) => {
      const index = Number(nextToken ?? 0);
      return {
        success: true,
        data: rows.slice(index, index + 1),
        nextToken: index + 1 < rows.length ? String(index + 1) : undefined,
      };
    }}
  />
);

const SortFilterState = () => {
  const actionRef = useRef<ActionType>();
  const [snapshot, setSnapshot] = useState('点击按钮读取');
  return (
    <ProTable<Row>
      actionRef={actionRef}
      rowKey="id"
      search={false}
      pagination={false}
      dataSource={rows}
      columns={[
        { title: '名称', dataIndex: 'name', sorter: true },
        {
          title: '状态',
          dataIndex: 'status',
          filters: true,
          valueEnum: { active: '启用', closed: '关闭' },
        },
      ]}
      toolBarRender={() => [
        <Space key="state">
          <Button
            onClick={() =>
              setSnapshot(
                JSON.stringify(actionRef.current?.getSortFilter?.() ?? {}),
              )
            }
          >
            读取排序和筛选
          </Button>
          <Typography.Text code>{snapshot}</Typography.Text>
        </Space>,
      ]}
    />
  );
};

const EditableDragSort = () => {
  const [dataSource, setDataSource] = useState<Row[]>(rows);
  return (
    <EditableProTable<Row>
      rowKey="id"
      value={dataSource}
      onChange={(value) => setDataSource([...value])}
      columns={[
        { title: '排序', dataIndex: 'sort', width: 64 },
        {
          title: '名称',
          dataIndex: 'name',
          formItemProps: {
            rules: [{ required: true, message: '请填写名称' }],
          },
          errorType: 'default',
        },
      ]}
      recordCreatorProps={false}
      dragSortKey="sort"
      editable={{ type: 'multiple', editableKeys: [1] }}
      onDragSortEnd={(_, __, nextDataSource) => {
        setDataSource(nextDataSource);
        message.success('顺序已更新，编辑行保持编辑状态');
      }}
    />
  );
};

const InlineValidation = () => {
  const editableFormRef = useRef<EditableFormInstance<Row>>();
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button
        onClick={() => {
          editableFormRef.current?.validateFields().catch(() => undefined);
        }}
      >
        验证并显示行内错误
      </Button>
      <EditableProTable<Row>
        editableFormRef={editableFormRef}
        rowKey="id"
        value={[{ id: 1, name: '' }]}
        recordCreatorProps={false}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            errorType: 'default',
            formItemProps: {
              rules: [{ required: true, message: '请填写名称' }],
            },
          },
        ]}
        editable={{ type: 'multiple', editableKeys: [1] }}
      />
    </Space>
  );
};

export default () => (
  <ProCard direction="column" ghost gutter={[0, 16]}>
    <Alert
      type="info"
      showIcon
      message="表格稳定性与新增能力"
      description="覆盖游标分页、排序筛选状态、可编辑行拖拽和行内校验错误。"
    />
    <ProCard>
      <Tabs
        destroyOnHidden
        items={[
          {
            key: 'cursor',
            label: '游标分页 #9500',
            children: <CursorPagination />,
          },
          {
            key: 'state',
            label: '排序筛选 #9197',
            children: <SortFilterState />,
          },
          {
            key: 'drag',
            label: '编辑拖拽 #9046',
            children: <EditableDragSort />,
          },
          {
            key: 'error',
            label: '行内错误 #8786',
            children: <InlineValidation />,
          },
        ]}
      />
    </ProCard>
  </ProCard>
);
