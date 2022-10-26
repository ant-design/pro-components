import { QuestionCircleOutlined } from '@ant-design/icons';
import type { BadgeProps, StatisticProps as AntdStatisticProps } from 'antd';
import { Badge, ConfigProvider, Statistic as AntdStatistic, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { useStyle } from './style';

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
  const { wrapSSR, hashId } = useStyle(prefixCls);
  const classString = classNames(prefixCls, className, hashId);
  const statusClass = classNames(`${prefixCls}-status`, hashId);
  const iconClass = classNames(`${prefixCls}-icon`, hashId);
  const wrapperClass = classNames(`${prefixCls}-wrapper`, hashId);
  const contentClass = classNames(`${prefixCls}-content`, hashId);

  const statisticClassName = classNames({
    hashId,
    [`${prefixCls}-layout-${layout}`]: layout,
    [`${prefixCls}-trend-${trend}`]: trend,
  });

  const tipDom = tip && (
    <Tooltip title={tip}>
      <QuestionCircleOutlined className={`${prefixCls}-tip ${hashId}`} />
    </Tooltip>
  );

  const trendIconClassName = classNames(`${prefixCls}-trend-icon`, hashId, {
    [`${prefixCls}-trend-icon-${trend}`]: trend,
  });

  const trendDom = trend && <div className={trendIconClassName} />;

  const statusDom = status && (
    <div className={statusClass}>
      <Badge status={status} text={null} />
    </div>
  );

  const iconDom = icon && <div className={iconClass}>{icon}</div>;

  return wrapSSR(
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
            <div className={`${prefixCls}-description ${hashId}`}>
              {description as React.ReactNode}
            </div>
          )}
        </div>
      </div>
    </div>,
  );
};

export default Statistic;
