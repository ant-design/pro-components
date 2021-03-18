import React, { useContext } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, ConfigProvider } from 'antd';
import type { TooltipProps } from 'antd';
import './index.less';

/**
 * 在 form 的 label 后面增加一个 tips 来展示一些说明文案
 *
 * @param props
 */
const LabelIconTip: React.FC<{
  label: React.ReactNode;
  subTitle?: React.ReactNode;
  tooltip?: string | TooltipProps;
}> = (props) => {
  const { label, tooltip, subTitle } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  if (!tooltip && !subTitle) {
    return <>{label}</>;
  }
  const className = getPrefixCls('pro-core-label-tip');
  const tooltipProps = typeof tooltip === 'string' ? { title: tooltip } : (tooltip as TooltipProps);
  return (
    <div className={className}>
      {label}
      {subTitle && <div className={`${className}-subtitle`}>{subTitle}</div>}
      {tooltip && (
        <Tooltip {...tooltipProps}>
          <InfoCircleOutlined className={`${className}-icon`} />
        </Tooltip>
      )}
    </div>
  );
};

export default React.memo(LabelIconTip);
