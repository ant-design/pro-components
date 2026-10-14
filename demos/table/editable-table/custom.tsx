import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Input, Space, Tag } from 'antd';
import { useState } from 'react';

type Label = { key: string; label: string };
type Task = { id: number; title: string; labels: Label[] };

const TagEditor = ({
  value = [],
  onChange,
}: {
  value?: Label[];
  onChange?: (value: Label[]) => void;
}) => {
  const [draft, setDraft] = useState('');
  const add = () => {
    const label = draft.trim();
    if (label && !value.some((item) => item.label === label)) {
      onChange?.([...value, { key: label, label }]);
    }
    setDraft('');
  };

  return (
    <Space wrap>
      {value.map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      <Input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onPressEnter={add}
        onBlur={add}
        placeholder="输入后回车"
        style={{ width: 120 }}
      />
    </Space>
  );
};

const columns: ProColumns<Task>[] = [
  { title: '任务名称', dataIndex: 'title' },
  {
    title: '标签',
    dataIndex: 'labels',
    formItemRender: () => <TagEditor />,
    render: (_, row) =>
      row.labels.map((item) => <Tag key={item.key}>{item.label}</Tag>),
  },
  {
    title: '操作',
    valueType: 'option',
    render: (_, row, __, action) => [
      <a key="edit" onClick={() => action?.startEditable?.(row.id)}>
        编辑
      </a>,
    ],
  },
];

export default () => {
  const [rows, setRows] = useState<readonly Task[]>([
    {
      id: 1,
      title: '优化首页加载速度',
      labels: [{ key: 'perf', label: '性能优化' }],
    },
  ]);
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);

  return (
    <EditableProTable<Task>
      rowKey="id"
      columns={columns}
      scroll={{ x: 500 }}
      value={rows}
      onChange={setRows}
      recordCreatorProps={false}
      editable={{ editableKeys, onChange: setEditableKeys }}
    />
  );
};
