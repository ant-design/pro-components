import React from 'react';
import classNames from 'classnames';
import { Statistic, Tooltip, Badge } from 'antd';
import { BadgeProps } from 'antd/lib/badge';
import { StatisticProps } from 'antd/lib/statistic/Statistic';
import { QuestionCircleOutlined } from '@ant-design/icons';
import getPrefixCls from '../_util/getPrefixCls';

type ReactNodeFunc = () => React.ReactNode;

export interface TechStatisticProps extends StatisticProps {
  /**
   * @description 自定义前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * @description 样式
   * @ignore
   */
  style?: React.CSSProperties;
  /**
   * @description className
   * @ignore
   */
  className?: string;
  /**
   * @description 描述性标签
   */
  description?: React.ReactNode | ReactNodeFunc;
  /**
   * @description 标题提示
   */
  tip?: React.ReactNode;
  /**
   * @description 当前项显示的状态
   */
  status?: BadgeProps['status'];
  /**
   * @description icon 图标
   */
  icon?: React.ReactNode;
  /**
   * @description layout 布局
   */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /**
   * @description 趋势
   */
  trend?: 'up' | 'down';
}

const TechStatistic: React.FC<TechStatisticProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
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

  const prefixCls = getPrefixCls('statistic-card-statistic', customizePrefixCls);
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
          <Statistic
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
          {description && <div className={`${prefixCls}-description`}>{description}</div>}
        </div>
      </div>
    </div>
  );
};

export default TechStatistic;
