import { EllipsisOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Button, Progress, Tag } from 'antd';
import type { ReactText } from 'react';
import { useState } from 'react';

const types = ['top', 'inline', 'new'];
const data = [
  '语雀的天空（top）',
  'Ant Design（inline）',
  '蚂蚁金服体验科技（new）',
  'TechUI',
].map((item, index) => ({
  title: item,
  subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
  actions: [
    <a key="invite">邀请</a>,
    <a key="operate">操作</a>,
    <a key="rest">
      <EllipsisOutlined />
    </a>,
  ],
  description: (
    <div>
      <div>top 会有小角标</div>
      <div>inline 标题字体是 normal</div>
      <div>new 会有一个入场动画</div>
    </div>
  ),
  type: types[index],
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <div>发布中</div>
        <Progress percent={80} />
      </div>
    </div>
  ),
}));

export default () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>(
    [],
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
  };
  const [dataSource, setDataSource] = useState<any[]>([...data] as any[]);

  return (
    <>
      <ProList<{
        title: string;
        subTitle: JSX.Element;
        actions: JSX.Element[];
        description: JSX.Element;
        type?: 'top' | 'inline' | 'new';
        avatar: string;
        children: JSX.Element;
      }>
        metas={{
          title: {},
          subTitle: {},
          type: {},
          description: {},
          avatar: {},
          content: {},
          actions: {},
        }}
        toolBarRender={() => [
          <Button
            key="3"
            type="primary"
            onClick={() => {
              setDataSource([...data.map((item) => ({ ...item }))]);
              setTimeout(() => {
                const list = [...data.map((item) => ({ ...item }))];
                list[1].type = 'new';
                setDataSource(list);
              }, 0);
            }}
          >
            刷新
          </Button>,
        ]}
        rowKey="id"
        headerTitle="预设的列状态"
        rowSelection={rowSelection}
        dataSource={dataSource}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
      />
    </>
  );
};
