import React, { useContext } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, ConfigProvider } from 'antd';
import './index.less';
import type { LabelTooltipType, WrapperTooltipProps } from 'antd/lib/form/FormItemLabel';

/**
 * 在 form 的 label 后面增加一个 tips 来展示一些说明文案
 *
 * @param props
 */
const LabelIconTip: React.FC<{
  label: React.ReactNode;
  subTitle?: React.ReactNode;
  tooltip?: string | LabelTooltipType;
}> = (props) => {
  const { label, tooltip, subTitle } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  if (!tooltip && !subTitle) {
    return <>{label}</>;
  }
  const className = getPrefixCls('pro-core-label-tip');
  const tooltipProps =
    typeof tooltip === 'string' || React.isValidElement(tooltip)
      ? { title: tooltip }
      : (tooltip as WrapperTooltipProps);

  const icon = tooltipProps?.icon || <InfoCircleOutlined />;
  return (
    <div
      className={className}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseLeave={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
    >
      {label}
      {subTitle && <div className={`${className}-subtitle`}>{subTitle}</div>}
      {tooltip && (
        <Tooltip {...tooltipProps}>
          <span className={`${className}-icon`}>{icon}</span>
        </Tooltip>
      )}
    </div>
  );
};

export default React.memo(LabelIconTip);
