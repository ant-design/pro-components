import { QuestionCircleOutlined } from '@ant-design/icons';
import { Badge, ConfigProvider, Statistic as AntdStatistic, Tooltip } from 'antd';
import type { BadgeProps } from 'antd/es/badge';
import type { StatisticProps as AntdStatisticProps } from 'antd/es/statistic/Statistic';
import classNames from 'classnames';
import React, { useContext } from 'react';
import './index.less';

export interface StatisticProps extends AntdStatisticProps {
  /**
   * 样式
   *
   * @ignore
   */
  style?: React.CSSProperties;
  /**
   * ClassName
   *
   * @ignore
   */
  className?: string;
  /** 描述性标签 */
  description?: React.ReactNode;
  /** 标题提示 */
  tip?: React.ReactNode;
  /** 当前项显示的状态 */
  status?: BadgeProps['status'] | undefined;
  /** Icon 图标 */
  icon?: React.ReactNode;
  /** Layout 布局 */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 趋势 */
  trend?: 'up' | 'down';

  children?: any;
}

const Statistic: React.FC<StatisticProps> = (props) => {
  const {
    className,
    layout = 'inline',
    style = {},
    description,
    children,
    title,
    tip,
    status,
    trend,
    prefix,
    icon,
    ...others
  } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-card-statistic');
  const classString = classNames(prefixCls, className);
  const statusClass = classNames(`${prefixCls}-status`);
  const iconClass = classNames(`${prefixCls}-icon`);
  const wrapperClass = classNames(`${prefixCls}-wrapper`);
  const contentClass = classNames(`${prefixCls}-content`);

  const statisticClassName = classNames({
    [`${prefixCls}-layout-${layout}`]: layout,
    [`${prefixCls}-trend-${trend}`]: trend,
  });

  const tipDom = tip && (
    <Tooltip title={tip}>
      <QuestionCircleOutlined className={`${prefixCls}-tip`} />
    </Tooltip>
  );

  const trendIconClassName = classNames(`${prefixCls}-trend-icon`, {
    [`${prefixCls}-trend-icon-${trend}`]: trend,
  });

  const trendDom = trend && <div className={trendIconClassName} />;

  const statusDom = status && (
    <div className={statusClass}>
      <Badge status={status} text={null} />
    </div>
  );

  const iconDom = icon && <div className={iconClass}>{icon}</div>;

  return (
    <div className={classString} style={style}>
      {iconDom}
      <div className={wrapperClass}>
        {statusDom}
        <div className={contentClass}>
          <AntdStatistic
            title={
              (title || tipDom) && (
                <>
                  {title}
                  {tipDom}
                </>
              )
            }
            prefix={
              (trendDom || prefix) && (
                <>
                  {trendDom}
                  {prefix}
                </>
              )
            }
            className={statisticClassName}
            {...others}
          />
          {description && (
            <div className={`${prefixCls}-description`}>{description as React.ReactNode}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistic;
