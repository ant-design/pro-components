import {
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Alert, Space, Typography } from 'antd';
import { useState } from 'react';

const remoteOptions = ['Alpha', 'Beta', 'Gamma', 'Delta'];

export default () => {
  const [lastSearch, setLastSearch] = useState('（尚未搜索）');
  const [treeOpen, setTreeOpen] = useState(false);

  return (
    <ProCard direction="column" ghost gutter={[0, 16]}>
      <Alert
        type="info"
        showIcon
        message="字段回归场景"
        description="覆盖对象形式 showSearch、受控 TreeSelect、只读空值、数字前后缀及混合 valueEnum。"
      />
      <ProCard title="SearchSelect 回调与远程请求（#9711）">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text type="secondary">
            输入关键字时，自定义 onSearch 与 request 会同时收到关键字。
          </Typography.Text>
          <ProForm submitter={false}>
            <ProFormSelect.SearchSelect
              name="keyword"
              label="远程搜索"
              debounceTime={100}
              request={async ({ keyWords }) => {
                const keyword = keyWords ?? '';
                return remoteOptions
                  .filter((item) =>
                    item.toLowerCase().includes(keyword.toLowerCase()),
                  )
                  .map((item) => ({ label: item, value: item }));
              }}
              fieldProps={{
                showSearch: {
                  onSearch: (value) => setLastSearch(value || '（空）'),
                },
              }}
            />
          </ProForm>
          <Typography.Text code>onSearch: {lastSearch}</Typography.Text>
        </Space>
      </ProCard>
      <ProCard title="字段数据流与只读展示（B7–B10）">
        <ProForm
          submitter={false}
          initialValues={{ amount: 128, status: 0, category: 'frontend' }}
          layout="horizontal"
        >
          <ProFormDigit
            name="amount"
            label="带前后缀数字"
            fieldProps={{ prefix: '¥', addonAfter: '元' }}
          />
          <ProFormSelect
            name="status"
            label="混合值 valueEnum"
            valueEnum={
              new Map<string | number, React.ReactNode>([
                [0, '未开始'],
                ['1', '进行中'],
                [2, '已完成'],
              ])
            }
          />
          <ProFormTreeSelect
            name="category"
            label="受控 TreeSelect"
            fieldProps={{
              open: treeOpen,
              onOpenChange: setTreeOpen,
              treeData: [
                {
                  title: '研发',
                  value: 'development',
                  children: [
                    { title: '前端', value: 'frontend' },
                    { title: '后端', value: 'backend' },
                  ],
                },
              ],
            }}
          />
          <ProFormDigit
            label="只读空值"
            name="empty"
            readonly
            fieldProps={{ addonAfter: '次' }}
          />
        </ProForm>
      </ProCard>
    </ProCard>
  );
};
