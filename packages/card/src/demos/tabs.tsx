import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
  const [tab, setTab] = useState('tab2');

  return (
    <ProCard
      tabs={{
        activeKey: tab,
        items: [
          {
            key: 'tab1',
            tab: '入站规则',
          },
          {
            key: 'tab2',
            tab: '安全配置',
          },
          {
            key: 'tab3',
            tab: '负载均衡',
          },
          {
            key: 'tab4',
            tab: '监控',
          },
          {
            key: 'tab5',
            tab: '事件',
          },
          {
            key: 'tab6',
            tab: 'YAML',
          },
        ],
        onChange: (key) => {
          setTab(key);
        },
      }}
    >
      标签内容 {tab}
    </ProCard>
  );
};
