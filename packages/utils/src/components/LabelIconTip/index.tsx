import React, { useContext } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, Space } from 'antd';
import { TooltipProps } from 'antd/lib/tooltip';
import { ConfigContext } from 'antd/lib/config-provider';
import './index.less';

/**
 * 在 form 的 label 后面增加一个 tips 来展示一些说明文案
 * @param props
 */
const LabelIconTip: React.FC<{
  label: React.ReactNode;
  tip?: string | TooltipProps;
}> = (props) => {
  const { label, tip } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  // 如果 tip 不存在直接使用了 label
  if (!tip) {
    return <>{label}</>;
  }
  const className = getPrefixCls('pro-core-label-tip');

  const tooltipProps: TooltipProps = typeof tip === 'string' ? { title: tip } : tip;
  return (
    <Space size={4} className={className}>
      {label}
      <Tooltip {...tooltipProps}>
        <InfoCircleOutlined className={`${className}-icon`} />
      </Tooltip>
    </Space>
  );
};

export default LabelIconTip;
