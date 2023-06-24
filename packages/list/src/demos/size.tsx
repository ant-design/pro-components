import { ProList } from '@ant-design/pro-components';
import { Button, Progress, Select } from 'antd';
import type { ReactText } from 'react';
import { useState } from 'react';

const dataSource = [
  {
    title: '语雀的天空',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'Ant Design',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: '蚂蚁金服体验科技',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
  {
    title: 'TechUI',
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
  },
];

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>(
    [],
  );
  const [size, setSize] = useState<'small' | 'default' | 'large' | undefined>(
    'default',
  );
  const [split, setSplit] = useState<0 | 1>(1);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
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
          {
            value: 1,
            label: '有',
          },
          {
            value: 0,
            label: '无',
          },
        ]}
      />{' '}
      <br />
      <br />
      <ProList<{ title: string }>
        size={size}
        split={split === 1}
        toolBarRender={() => {
          return [
            <Button key="3" type="primary">
              新建
            </Button>,
          ];
        }}
        metas={{
          title: {},
          description: {
            render: () => {
              return 'Ant Design, a design language for background applications, is refined by Ant UED Team';
            },
          },
          avatar: {},
          content: {
            render: () => (
              <div
                style={{
                  minWidth: 200,
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    width: '200px',
                  }}
                >
                  <div>发布中</div>
                  <Progress percent={80} />
                </div>
              </div>
            ),
          },
          actions: {
            render: () => {
              return [<a key="init">邀请</a>];
            },
          },
        }}
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
