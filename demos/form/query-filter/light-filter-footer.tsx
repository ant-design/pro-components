import { LightFilter } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useState } from 'react';

export default () => {
  const [values, setValues] = useState<Record<string, unknown>>({
    status: 'open',
  });

  return (
    <div>
      <LightFilter
        collapse
        collapseLabel="筛选"
        initialValues={{ status: 'open' }}
        footerRender={(onConfirm, onClear) => (
          <Space>
            <Button onClick={() => onClear?.()}>恢复默认</Button>
            <Button type="primary" onClick={() => onConfirm?.()}>
              应用筛选
            </Button>
          </Space>
        )}
        onFinish={async (nextValues) => {
          setValues(nextValues);
          return true;
        }}
      >
        <LightFilter.select
          name="status"
          label="状态"
          valueEnum={{ open: '待处理', closed: '已完成' }}
        />
      </LightFilter>
      <div role="status" style={{ marginTop: 16 }}>
        当前筛选：{JSON.stringify(values)}
      </div>
    </div>
  );
};
