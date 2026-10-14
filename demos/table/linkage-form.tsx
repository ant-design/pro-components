import { ProTable } from '@ant-design/pro-components';
import type { FormInstance } from 'antd';
import { Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';

type Service = { id: number; name: string };

const PeriodDetail = ({ form }: { form: FormInstance }) => {
  const period = Form.useWatch('period', form) || 'month';
  const value = Form.useWatch('detail', form);

  useEffect(() => {
    form.setFieldValue('detail', undefined);
  }, [form, period]);

  if (period === 'custom') {
    return (
      <Input
        value={value}
        onChange={(event) => form.setFieldValue('detail', event.target.value)}
        placeholder="输入自定义周期"
      />
    );
  }

  return (
    <Select
      value={value}
      onChange={(selected) => form.setFieldValue('detail', selected)}
      placeholder="选择周期值"
      options={
        period === 'week'
          ? [
              { label: '星期一', value: 'week-1' },
              { label: '星期二', value: 'week-2' },
            ]
          : [
              { label: '一月', value: 'month-1' },
              { label: '二月', value: 'month-2' },
            ]
      }
    />
  );
};

export default () => {
  const [query, setQuery] = useState('');

  return (
    <div style={{ maxWidth: '100%', padding: 16 }}>
      <ProTable<Service>
        rowKey="id"
        columns={[
          { title: '服务', dataIndex: 'name', search: false },
          {
            title: '查询周期',
            dataIndex: 'period',
            hideInTable: true,
            valueType: 'select',
            initialValue: 'month',
            valueEnum: {
              month: '按月',
              week: '按周',
              custom: '自定义',
            },
          },
          {
            title: '周期值',
            dataIndex: 'detail',
            hideInTable: true,
            formItemRender: (_, __, form) => <PeriodDetail form={form} />,
          },
        ]}
        request={async () => ({
          data: [{ id: 1, name: '用户认证服务' }],
          success: true,
        })}
        onSubmit={(values) => setQuery(JSON.stringify(values, null, 2))}
        search={{ defaultCollapsed: false }}
        options={false}
        pagination={false}
      />
      {query && (
        <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
          {query}
        </pre>
      )}
    </div>
  );
};
