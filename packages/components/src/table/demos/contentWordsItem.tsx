import { ProColumns, ProTable } from '@ant-design/pro-components';

type ContentWordsItem = {
  id: string;
  problemCause: string;
};

const getData = () => {
  const arr = Array.from({ length: 100 }).map((_, idx) => ({
    id: (idx + 1).toString(),
    problemCause: 'problemCause',
  }));
  return arr;
};

export default () => {
  const columns: ProColumns<ContentWordsItem>[] = [
    {
      disable: true,
      title: '问题标注',
      dataIndex: 'problemCause',
      editable: false,
      onFilter: false,
      ellipsis: true,
      search: true,
      valueType: 'select',
      width: 180,
    },
  ];

  return (
    <div>
      <ProTable<ContentWordsItem>
        rowKey="id"
        columns={columns}
        request={async () => {
          const data = getData();
          return {
            data: data,
            total: data.length,
            success: true,
          };
        }}
      />
    </div>
  );
};
