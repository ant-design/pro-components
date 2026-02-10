import { ProList } from '@ant-design/pro-components';
import { Button, Progress, Select, Tag } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';

type ProjectItem = {
  title: string;
  avatar: string;
  description: string;
  progress: number;
  status: string;
};

const dataSource: ProjectItem[] = [
  {
    title: '智慧零售平台',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    description: '面向线下门店的数字化经营解决方案',
    progress: 85,
    status: '开发中',
  },
  {
    title: 'Ant Design Pro',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    description: '开箱即用的中台前端解决方案',
    progress: 100,
    status: '已上线',
  },
  {
    title: '云原生微服务框架',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    description: '基于 K8s 的微服务开发与治理框架',
    progress: 92,
    status: '测试中',
  },
  {
    title: '数据可视化引擎',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    description: '企业级数据看板与图表分析工具',
    progress: 60,
    status: '开发中',
  },
];

const Demo = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);
  const [size, setSize] = useState<'small' | 'default' | 'large' | undefined>(
    'default',
  );
  const [split, setSplit] = useState<0 | 1>(1);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: Key[]) => setSelectedRowKeys(keys),
  };

  return (
    <>
      大小：
      <Select<string>
        value={size}
        onChange={(value) => setSize(value as any)}
        options={['small', 'default', 'large'].map((selectSize) => ({
          value: selectSize,
          label: selectSize,
        }))}
      />{' '}
      分割线：
      <Select<0 | 1>
        value={split}
        onChange={(value) => setSplit(value)}
        options={[
          { value: 1, label: '有' },
          { value: 0, label: '无' },
        ]}
      />{' '}
      <br />
      <br />
      <ProList<ProjectItem>
        size={size}
        split={split === 1}
        toolBarRender={() => {
          return [
            <Button key="new" type="primary">
              新建
            </Button>,
          ];
        }}
        columns={[
          { dataIndex: 'title', listSlot: 'title' },
          { dataIndex: 'description', listSlot: 'description' },
          { dataIndex: 'avatar', listSlot: 'avatar' },
          {
            listSlot: 'content',
            render: (_, record) => (
              <div
                style={{
                  minWidth: 200,
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <div style={{ width: 200 }}>
                  <div>
                    {record.status}{' '}
                    <Tag
                      color={record.progress === 100 ? 'success' : 'processing'}
                    >
                      {record.progress}%
                    </Tag>
                  </div>
                  <Progress percent={record.progress} showInfo={false} />
                </div>
              </div>
            ),
          },
          {
            listSlot: 'actions',
            render: () => [<a key="invite">邀请</a>],
          },
        ]}
        expandable={{
          expandedRowKeys,
          defaultExpandAllRows: false,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
        rowKey="title"
        headerTitle="大小和分割线"
        rowSelection={rowSelection}
        dataSource={dataSource}
      />
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
