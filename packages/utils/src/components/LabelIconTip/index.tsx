import React, { useContext } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, Space } from 'antd';
import { TooltipProps } from 'antd/lib/tooltip';
import { ConfigContext } from 'antd/lib/config-provider';
import './index.less';

function getTitle(title: React.ReactNode, className: string) {
  if (!title) {
    return null;
  }
  if (React.isValidElement(title)) {
    return title;
  }
  return <div className={className}>{title}</div>;
}

/**
 * 在 form 的 label 后面增加一个 tips 来展示一些说明文案
 * @param props
 */
const LabelIconTip: React.FC<{
  label: React.ReactNode;
  subTitle?: React.ReactNode;
  tip?: string | TooltipProps;
}> = (props) => {
  const { label, tip, subTitle } = props;
  const { getPrefixCls } = useContext(ConfigContext);

  if (!tip && !subTitle) {
    return <>{label}</>;
  }
  const className = getPrefixCls('pro-core-label-tip');
  const subTitleNode = getTitle(subTitle, `${className}-subtitle`);
  const tooltipProps = typeof tip === 'string' ? { title: tip } : (tip as TooltipProps);

  return (
    <Space size={4} className={className}>
      {label}
      {subTitleNode}
      {tip && (
        <Tooltip {...tooltipProps}>
          <InfoCircleOutlined className={`${className}-icon`} />
        </Tooltip>
      )}
    </Space>
  );
};

export default LabelIconTip;
