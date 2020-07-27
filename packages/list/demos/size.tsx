import React, { useState, ReactText } from 'react';
import { Button, Select, Progress, Tag } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import ProList from '@ant-design/pro-list';

const dataSource = ['语雀的天空', 'Ant Design', '蚂蚁金服体验科技', 'TechUI'];

export default () => {
  const [size, setSize] = useState<'small' | 'default' | 'large' | undefined>('default');
  const [split, setSplit] = useState<string>('有');
  const [bordered, setBordered] = useState<string>('有');
  const [expandedRowKeys, setExpandedRowKeys] = useState<ReactText[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
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
      <Select<string>
        value={split}
        onChange={(value) => setSplit(value)}
        options={['有', '无'].map((selectSize) => ({
          value: selectSize,
          label: selectSize,
        }))}
      />{' '}
      边框线：
      <Select<string>
        value={bordered}
        onChange={(value) => setBordered(value)}
        options={['有', '无'].map((selectSize) => ({
          value: selectSize,
          label: selectSize,
        }))}
      />
      <br />
      <br />
      <ProList<string>
        size={size}
        split={split === '有'}
        actions={[
          <Button key="3" type="primary">
            新建
          </Button>,
        ]}
        bordered={bordered === '有'}
        rowKey="id"
        title="复杂的例子"
        rowSelection={rowSelection}
        dataSource={dataSource}
        expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
        renderItem={(item) => ({
          title: item,
          subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
          actions: [
            <a>邀请</a>,
            <a>操作</a>,
            <a>
              <EllipsisOutlined />
            </a>,
          ],
          description: (
            <div>
              <div>一个 UI 设计体系</div>
              <div>林外发布于 2019-06-25</div>
            </div>
          ),
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
          children: (
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
        })}
      />
    </>
  );
};
