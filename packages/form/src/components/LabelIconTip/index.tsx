import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, Space } from 'antd';
import { TooltipProps } from 'antd/lib/tooltip';

/**
 * 在 form 的 label 后面增加一个 tips 来展示一些说明文案
 * @param props
 */
const LabelIconTip: React.FC<{
  label: React.ReactNode;
  tip: string | TooltipProps;
}> = (props) => {
  const { label, tip } = props;
  const tooltipProps: TooltipProps = typeof tip === 'string' ? { title: tip } : tip;
  return (
    <Space>
      {label}
      <Tooltip {...tooltipProps}>
        <InfoCircleOutlined />
      </Tooltip>
    </Space>
  );
};

export default LabelIconTip;
