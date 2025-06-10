import type { ProCardTabsProps } from '@ant-design/pro-components;
import { ProCard } from '@ant-design/pro-components;
import { Select, Space } from 'antd';
import { useState } from 'react';

const { Option } = Select;

export default () => {
  const [tab, setTab] = useState('tab2');
  const [tabPosition, setTabPosition] =
    useState<ProCardTabsProps['tabPosition']>('top');

  return (
    <div>
      <Space style={{ marginBlockEnd: 16 }}>
        Tab position：
        <Select
          value={tabPosition}
          onChange={(value) => setTabPosition(value)}
          popupMatchSelectWidth={false}
        >
          <Option value="top">top</Option>
          <Option value="bottom">bottom</Option>
          <Option value="left">left</Option>
          <Option value="right">right</Option>
        </Select>
      </Space>
      <ProCard
        tabs={{
          tabPosition,
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
  );
};
