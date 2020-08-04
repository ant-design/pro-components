import React from 'react';
import ProCard from '../src/index';

export default () => {
  return (
    <ProCard
      title="标题"
      extra="extra"
      style={{ width: 300 }}
      headerBordered
      collapsible
      defaultCollapsed
      onCollapse={(collapse) => console.log(collapse)}
    >
      内容
    </ProCard>
  );
};
