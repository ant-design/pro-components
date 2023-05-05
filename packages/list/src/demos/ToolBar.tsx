import { ProList } from '@ant-design/pro-components';
import { Badge, Button } from 'antd';
import React, { useState } from 'react';

const dataSource = [
  {
    name: '实验名称1',
    desc: '系统性的沉淀B端知识体系',
    content: [
      {
        label: '模型数',
        value: 2903,
      },
      {
        label: '指标数',
        value: 3720,
      },
      {
        label: '实验状态',
        value: '成功',
        status: 'success',
      },
    ],
  },
  {
    name: '实验名称2',
    desc: '系统性的沉淀B端知识体系',
    content: [
      {
        label: '模型数',
        value: 2904,
      },
      {
        label: '指标数',
        value: 3721,
      },
      {
        label: '实验状态',
        value: '成功',
        status: 'success',
      },
    ],
  },
  {
    name: '实验名称3',
    desc: '系统性的沉淀B端知识体系',
    content: [
      {
        label: '模型数',
        value: 2905,
      },
      {
        label: '指标数',
        value: 3722,
      },
      {
        label: '实验状态',
        value: '成功',
        status: 'success',
      },
    ],
  },
];

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};

export default () => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('tab1');
  return (
    <ProList<any>
      rowKey="name"
      dataSource={dataSource}
      metas={{
        title: {
          dataIndex: 'name',
        },
        description: {
          dataIndex: 'desc',
        },
        content: {
          dataIndex: 'content',
          render: (text) => (
            <div
              key="label"
              style={{ display: 'flex', justifyContent: 'space-around' }}
            >
              {(text as any[]).map((t) => (
                <div key={t.label}>
                  <div style={{ color: '#00000073' }}>{t.label}</div>
                  <div style={{ color: '#000000D9' }}>
                    {t.status === 'success' && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: '#52c41a',
                          marginInlineEnd: 8,
                        }}
                      />
                    )}
                    {t.value}
                  </div>
                </div>
              ))}
            </div>
          ),
        },
        actions: {
          render: (text, row) => [
            <a
              href={row.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key="link"
            >
              编辑
            </a>,
            <a
              href={row.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key="warning"
            >
              复制
            </a>,
            <a
              href={row.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key="view"
            >
              删除
            </a>,
          ],
        },
      }}
      toolbar={{
        menu: {
          activeKey,
          items: [
            {
              key: 'tab1',
              label: (
                <span>全部实验室{renderBadge(99, activeKey === 'tab1')}</span>
              ),
            },
            {
              key: 'tab2',
              label: (
                <span>
                  我创建的实验室{renderBadge(32, activeKey === 'tab2')}
                </span>
              ),
            },
          ],
          onChange(key) {
            setActiveKey(key);
          },
        },
        search: {
          onSearch: (value: string) => {
            alert(value);
          },
        },
        actions: [
          <Button type="primary" key="primary">
            新建实验
          </Button>,
        ],
      }}
    />
  );
};
