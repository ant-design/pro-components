import React, { useContext } from 'react';
import { Grid, Tabs, ConfigProvider } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { LabelIconTip } from '@ant-design/pro-utils';
import type { CardProps, Gutter, Breakpoint, CardType } from '../../type';
import classNames from 'classnames';
import omit from 'omit.js';
import CardLoading from '../CardLoading';
import Actions from '../Actions';
import './index.less';

const { useBreakpoint } = Grid;

type ProCardChildType = React.ReactElement<CardProps, any>;

// @ts-ignore
const Card: CardType = React.forwardRef<HTMLDivElement>((props: CardProps, ref) => {
  const {
    className,
    style,
    bodyStyle = {},
    headStyle = {},
    title,
    subTitle,
    extra,
    tip,
    layout,
    loading,
    colSpan,
    gutter = 0,
    tooltip,
    split,
    headerBordered = false,
    bordered = false,
    children,
    size,
    actions,
    ghost = false,
    hoverable = false,
    direction,
    collapsed: controlCollapsed,
    collapsible = false,
    defaultCollapsed = false,
    onCollapse,
    tabs,
    type,
    ...rest
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useMergedState<boolean>(defaultCollapsed, {
    value: controlCollapsed,
    onChange: onCollapse,
  });

  // 顺序决定如何进行响应式取值，按最大响应值依次取值，请勿修改。
  const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

  /**
   * 根据响应式获取 gutter, 参考 antd 实现
   *
   * @param gutter Gutter
   */
  const getNormalizedGutter = (gut: Gutter | Gutter[]) => {
    const results: [number, number] = [0, 0];
    const normalizedGutter = Array.isArray(gut) ? gut : [gut, 0];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object') {
        for (let i = 0; i < responsiveArray.length; i += 1) {
          const breakpoint: Breakpoint = responsiveArray[i];
          if (screens[breakpoint] && g[breakpoint] !== undefined) {
            results[index] = g[breakpoint] as number;
            break;
          }
        }
      } else {
        results[index] = g || 0;
      }
    });
    return results;
  };

  /**
   * 根据条件返回 style，负责返回空对象
   *
   * @param withStyle 是否符合条件
   * @param appendStyle 如果符合条件要返回的 style 属性
   */
  const getStyle = (withStyle: boolean, appendStyle: React.CSSProperties) => {
    return withStyle ? appendStyle : {};
  };

  const prefixCls = getPrefixCls('pro-card');

  const normalizedGutter = getNormalizedGutter(gutter);

  // 判断是否套了卡片，如果套了的话将自身卡片内部内容的 padding 设置为0
  let containProCard;
  const childrenArray = React.Children.toArray(children) as ProCardChildType[];

  const childrenModified = childrenArray.map((element, index) => {
    if (element?.type?.isProCard) {
      containProCard = true;

      // 右侧空隙
      const gutterRightStyle = getStyle(
        normalizedGutter[0]! > 0 && index !== childrenArray.length - 1,
        {
          marginRight: normalizedGutter[0],
        },
      );

      // 下方空隙
      const gutterBottomStyle = getStyle(normalizedGutter[1]! > 0, {
        marginBottom: normalizedGutter[1],
      });

      // 当 split 有值时，内部卡片 radius 设置为 0
      const splitStyle = getStyle(split === 'vertical' || split === 'horizontal', {
        borderRadius: 0,
      });

      return React.cloneElement(element, {
        className: classNames(element.props.className, {
          // 横纵切割
          [`${prefixCls}-split-vertical`]:
            split === 'vertical' && index !== childrenArray.length - 1,
          [`${prefixCls}-split-horizontal`]:
            split === 'horizontal' && index !== childrenArray.length - 1,
        }),
        style: {
          ...gutterRightStyle,
          ...gutterBottomStyle,
          ...splitStyle,
          ...element.props.style,
        },
      });
    }
    return element;
  });

  let span = colSpan;

  // colSpan 响应式
  if (typeof colSpan === 'object') {
    for (let i = 0; i < responsiveArray.length; i += 1) {
      const breakpoint: Breakpoint = responsiveArray[i];
      if (screens[breakpoint] && colSpan[breakpoint] !== undefined) {
        span = colSpan[breakpoint];
        break;
      }
    }
  }

  // 当 colSpan 为 30% 或 300px 时
  const colSpanStyle = getStyle(typeof span === 'string' && /\d%|\dpx/i.test(span), {
    width: span as string,
    flexShrink: 0,
  });

  const cardStyle = {
    ...colSpanStyle,
    ...style,
  };

  const cardCls = classNames(`${prefixCls}`, className, {
    [`${prefixCls}-span-${span}`]: typeof span === 'number' && span >= 0 && span <= 24,
    [`${prefixCls}-border`]: bordered,
    [`${prefixCls}-contain-card`]: containProCard,
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-split`]: split === 'vertical' || split === 'horizontal',
    [`${prefixCls}-ghost`]: ghost,
    [`${prefixCls}-hoverable`]: hoverable,
    [`${prefixCls}-size-${size}`]: size,
    [`${prefixCls}-type-${type}`]: type,
    [`${prefixCls}-collapse`]: collapsed,
  });

  const headerCls = classNames(`${prefixCls}-header`, {
    [`${prefixCls}-header-border`]: headerBordered || type === 'inner',
  });

  const bodyCls = classNames(`${prefixCls}-body`, {
    [`${prefixCls}-body-center`]: layout === 'center',
    [`${prefixCls}-body-column`]: split === 'horizontal' || direction === 'column',
  });

  const loadingBlockStyle =
    bodyStyle.padding === 0 || bodyStyle.padding === '0px' ? { padding: 24 } : undefined;

  const loadingDOM = React.isValidElement(loading) ? (
    loading
  ) : (
    <CardLoading prefix={prefixCls} style={loadingBlockStyle} />
  );

  // 非受控情况下展示
  const collapsibleButton = collapsible && controlCollapsed === undefined && (
    <RightOutlined
      rotate={!collapsed ? 90 : undefined}
      className={`${prefixCls}-collapsible-icon`}
    />
  );

  const titleCls = classNames(`${prefixCls}-title`, {
    [`${prefixCls}-title-collapsible`]: collapsibleButton,
  });

  /** 操作按钮 */
  const actionDom = <Actions actions={actions} prefixCls={prefixCls} />;

  return (
    <div className={cardCls} style={cardStyle} ref={ref} {...omit(rest, ['id', 'prefixCls'])}>
      {(title || extra || collapsibleButton) && (
        <div className={headerCls} style={headStyle}>
          <div
            className={titleCls}
            onClick={() => {
              if (collapsibleButton) setCollapsed(!collapsed);
            }}
          >
            {collapsibleButton}
            <LabelIconTip label={title} tooltip={tooltip || tip} subTitle={subTitle} />
          </div>
          <div className={`${prefixCls}-extra`}>{extra}</div>
        </div>
      )}
      {tabs ? (
        <div className={`${prefixCls}-tabs`}>
          <Tabs onChange={tabs.onChange} {...tabs}>
            {loading ? loadingDOM : children}
          </Tabs>
        </div>
      ) : (
        <div className={bodyCls} style={bodyStyle}>
          {loading ? loadingDOM : childrenModified}
        </div>
      )}
      {actionDom}
    </div>
  );
});

export default Card;
