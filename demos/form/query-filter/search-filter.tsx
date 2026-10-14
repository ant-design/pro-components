import { ProFormText, QueryFilter } from '@ant-design/pro-components';
import { useState } from 'react';

type Filters = { name?: string; owner?: string };

export default () => {
  const [filters, setFilters] = useState<Filters>({});

  return (
    <div style={{ padding: 24 }}>
      <QueryFilter<Filters>
        layout="vertical"
        split
        defaultCollapsed={false}
        onFinish={async (values) => {
          setFilters(values);
          return true;
        }}
      >
        <ProFormText
          name="name"
          label="项目名称"
          colProps={{ span: 24 }}
          placeholder="输入项目名称"
        />
        <ProFormText
          name="owner"
          label="负责人"
          colProps={{ span: 24 }}
          placeholder="输入负责人"
        />
      </QueryFilter>
      <p>提交的筛选条件：{JSON.stringify(filters)}</p>
    </div>
  );
};
