import { InfoCircleOutlined } from '@ant-design/icons';
import { ConfigProvider, Tooltip } from 'antd';
import type { LabelTooltipType, WrapperTooltipProps } from 'antd/es/form/FormItemLabel';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { useStyle } from './style';

/**
 * 在 form 的 label 后面增加一个 tips 来展示一些说明文案
 *
 * @param props
 */
const LabelIconTip: React.FC<{
  label: React.ReactNode;
  subTitle?: React.ReactNode;
  tooltip?: string | LabelTooltipType;
  ellipsis?: boolean | { showTitle?: boolean };
}> = (props) => {
  const { label, tooltip, ellipsis, subTitle } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-core-label-tip');

  const { wrapSSR, hashId } = useStyle(className);
  if (!tooltip && !subTitle) {
    return <>{label}</>;
  }
  const tooltipProps =
    typeof tooltip === 'string' || React.isValidElement(tooltip)
      ? { title: tooltip }
      : (tooltip as WrapperTooltipProps);

  const icon = tooltipProps?.icon || <InfoCircleOutlined />;

  return wrapSSR(
    <div
      className={classNames(className, hashId)}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseLeave={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
    >
      <div
        className={classNames(`${className}-title`, {
          [`${className}-title-ellipsis`]: ellipsis,
        })}
      >
        {label}
      </div>
      {subTitle && <div className={`${className}-subtitle`}>{subTitle}</div>}
      {tooltip && (
        <Tooltip {...tooltipProps}>
          <span className={`${className}-icon`}>{icon}</span>
        </Tooltip>
      )}
    </div>,
  );
};

export default React.memo(LabelIconTip);
