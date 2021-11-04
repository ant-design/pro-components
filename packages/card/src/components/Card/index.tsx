import React, { useContext } from 'react';
import { Grid, Tabs, ConfigProvider } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { LabelIconTip } from '@ant-design/pro-utils';
import type { CardProps, Gutter, Breakpoint } from '../../type';
import classNames from 'classnames';
import omit from 'omit.js';
import Loading from '../Loading';
import Actions from '../Actions';
import './index.less';

const { useBreakpoint } = Grid;

type ProCardChildType = React.ReactElement<CardProps, any>;

const Card = React.forwardRef((props: CardProps, ref: any) => {
  const {
    className,
    style,
    bodyStyle = {},
    headStyle = {},
    title,
    subTitle,
    extra,
    tip,
    wrap = false,
    layout,
    loading,
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
    checked,
    onChecked,
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

  const getColSpanStyle = (colSpan: CardProps['colSpan']) => {
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

    return { span, colSpanStyle };
  };

  const prefixCls = getPrefixCls('pro-card');

  const [horizonalGutter, verticalGutter] = getNormalizedGutter(gutter);

  // 判断是否套了卡片，如果套了的话将自身卡片内部内容的 padding 设置为0
  let containProCard = false;
  const childrenArray = React.Children.toArray(children) as ProCardChildType[];

  const childrenModified = childrenArray.map((element, index) => {
    if (element?.type?.isProCard) {
      containProCard = true;

      // 宽度
      const { colSpan } = element.props;
      const { span, colSpanStyle } = getColSpanStyle(colSpan);

      const columnClassName = classNames([`${prefixCls}-col`], {
        [`${prefixCls}-split-vertical`]: split === 'vertical' && index !== childrenArray.length - 1,
        [`${prefixCls}-split-horizontal`]:
          split === 'horizontal' && index !== childrenArray.length - 1,
        [`${prefixCls}-col-${span}`]: typeof span === 'number' && span >= 0 && span <= 24,
      });

      return (
        <div
          style={{
            ...colSpanStyle,
            ...getStyle(horizonalGutter! > 0, {
              paddingRight: horizonalGutter / 2,
              paddingLeft: horizonalGutter / 2,
            }),
            ...getStyle(verticalGutter! > 0, {
              paddingTop: verticalGutter / 2,
              paddingBottom: verticalGutter / 2,
            }),
          }}
          // eslint-disable-next-line react/no-array-index-key
          key={`pro-card-col-${index}`}
          className={columnClassName}
        >
          {React.cloneElement(element)}
        </div>
      );
    }
    return element;
  });

  const cardCls = classNames(`${prefixCls}`, className, {
    [`${prefixCls}-border`]: bordered,
    [`${prefixCls}-contain-card`]: containProCard,
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-split`]: split === 'vertical' || split === 'horizontal',
    [`${prefixCls}-ghost`]: ghost,
    [`${prefixCls}-hoverable`]: hoverable,
    [`${prefixCls}-size-${size}`]: size,
    [`${prefixCls}-type-${type}`]: type,
    [`${prefixCls}-collapse`]: collapsed,
    [`${prefixCls}-checked`]: checked,
  });

  const bodyCls = classNames(`${prefixCls}-body`, {
    [`${prefixCls}-body-center`]: layout === 'center',
    [`${prefixCls}-body-direction-column`]: split === 'horizontal' || direction === 'column',
    [`${prefixCls}-body-wrap`]: wrap && containProCard,
  });

  const cardBodyStyle = {
    ...getStyle(horizonalGutter! > 0, {
      marginRight: -horizonalGutter / 2,
      marginLeft: -horizonalGutter / 2,
    }),
    ...getStyle(verticalGutter! > 0, {
      marginTop: -verticalGutter / 2,
      marginBottom: -verticalGutter / 2,
    }),
    ...bodyStyle,
  };

  const loadingDOM = React.isValidElement(loading) ? (
    loading
  ) : (
    <Loading
      prefix={prefixCls}
      style={bodyStyle.padding === 0 || bodyStyle.padding === '0px' ? { padding: 24 } : undefined}
    />
  );

  // 非受控情况下展示
  const collapsibleButton = collapsible && controlCollapsed === undefined && (
    <RightOutlined
      rotate={!collapsed ? 90 : undefined}
      className={`${prefixCls}-collapsible-icon`}
    />
  );

  return (
    <div
      className={cardCls}
      style={style}
      ref={ref}
      onClick={(e) => {
        onChecked?.(e);
        rest?.onClick?.(e);
      }}
      {...omit(rest, ['prefixCls', 'colSpan'])}
    >
      {(title || extra || collapsibleButton) && (
        <div
          className={classNames(`${prefixCls}-header`, {
            [`${prefixCls}-header-border`]: headerBordered || type === 'inner',
            [`${prefixCls}-header-collapsible`]: collapsibleButton,
          })}
          style={headStyle}
          onClick={() => {
            if (collapsibleButton) setCollapsed(!collapsed);
          }}
        >
          <div className={`${prefixCls}-title`}>
            {collapsibleButton}
            <LabelIconTip label={title} tooltip={tooltip || tip} subTitle={subTitle} />
          </div>
          {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
        </div>
      )}
      {tabs ? (
        <div className={`${prefixCls}-tabs`}>
          <Tabs onChange={tabs.onChange} {...tabs}>
            {loading ? loadingDOM : children}
          </Tabs>
        </div>
      ) : (
        <div className={bodyCls} style={cardBodyStyle}>
          {loading ? loadingDOM : childrenModified}
        </div>
      )}
      {<Actions actions={actions} prefixCls={prefixCls} />}
    </div>
  );
});

export default Card;
