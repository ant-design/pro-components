import { RightOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
        gap: 12,
      }}
    >
      <ProCard
        title="Collapsible"
        headerBordered
        collapsible
        defaultCollapsed
        onCollapse={(collapse) => console.log(collapse)}
        extra={
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Submit
          </Button>
        }
      >
        Content
      </ProCard>
      <ProCard
        title="Collapsible"
        headerBordered
        collapsible="icon"
        defaultCollapsed
        onCollapse={(collapse) => console.log(collapse)}
        extra={
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Submit
          </Button>
        }
      >
        Content
      </ProCard>
      <ProCard
        title="Collapsible"
        bordered
        headerBordered
        collapsible
        defaultCollapsed
        onCollapse={(collapse) => console.log(collapse)}
        extra={
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Submit
          </Button>
        }
      >
        Content
      </ProCard>
      <ProCard
        bordered
        size="small"
        title="Collapsible"
        headerBordered
        collapsible
        defaultCollapsed
        onCollapse={(collapse) => console.log(collapse)}
        extra={
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Submit
          </Button>
        }
      >
        Content
      </ProCard>
      <ProCard
        title="Collapsible - Controlled Custom"
        extra={
          <RightOutlined
            rotate={!collapsed ? 90 : undefined}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        }
        style={{ marginBlockStart: 16 }}
        headerBordered
        collapsed={collapsed}
      >
        Content
      </ProCard>
      <ProCard
        title="Collapsible - Custom Icon"
        collapsibleIconRender={({
          collapsed: buildInCollapsed,
        }: {
          collapsed: boolean;
        }) => (buildInCollapsed ? <span>Collapse - </span> : <span>Expand - </span>)}
        style={{ marginBlockStart: 16 }}
        headerBordered
        collapsible
        defaultCollapsed
      >
        Content
      </ProCard>
    </div>
  );
};
