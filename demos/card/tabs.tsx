import type { ProCardTabsProps } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { Select, Space } from 'antd';
import { useState } from 'react';

const { Option } = Select;

const Demo = () => {
  const [tab, setTab] = useState('tab2');
  const [tabPlacement, setTabPlacement] =
    useState<ProCardTabsProps['tabPlacement']>('top');

  return (
    <>
      <div>
        <Space style={{ marginBlockEnd: 16 }}>
          Tab placement：
          <Select
            value={tabPlacement}
            onChange={(value) => setTabPlacement(value)}
            popupMatchSelectWidth={false}
          >
            <Option value="top">top</Option>
            <Option value="bottom">bottom</Option>
            <Option value="start">start</Option>
            <Option value="end">end</Option>
          </Select>
        </Space>
        <ProCard
          tabs={{
            size: 'medium',
            tabPlacement,
            activeKey: tab,
            items: [
              {
                label: `Product One`,
                key: 'tab1',
                children: `Content One`,
              },
              {
                label: `Product Two`,
                key: 'tab2',
                children: `Content Two`,
              },
              {
                label: `Product Three`,
                key: 'tab3',
                children: `Content Three`,
              },
            ],
            onChange: (key) => {
              setTab(key);
            },
          }}
        />
      </div>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
