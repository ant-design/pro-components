import React, { ReactNode } from 'react';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider/context';
import { Grid } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { LabelIconTip } from '@ant-design/pro-utils';
import classNames from 'classnames';
import CardLoading from './cardLoading';
import './style/index.less';

const { useBreakpoint } = Grid;

type ProCardType = React.FC<ProCardProps> & {
  isProCard: boolean;
};

type ProCardChildType = React.ReactElement<ProCardProps, ProCardType>;

type ColSpanType = number | string;
export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type Gutter = number | Partial<Record<Breakpoint, number>>;

export type ProCardProps = {
  /**
   * 类名
   */
  className?: string;
  /**
   * 样式属性
   */
  style?: React.CSSProperties;
  /**
   * 标题样式
   */
  headStyle?: React.CSSProperties;
  /**
   * 内容样式
   */
  bodyStyle?: React.CSSProperties;
  /**
   * 页头是否有分割线
   */
  headerBordered?: boolean;
  /**
   * 卡片标题
   */
  title?: React.ReactNode;
  /**
   * 标题说明
   */
  tip?: string;
  /**
   * 右上角自定义区域
   */
  extra?: React.ReactNode;
  /**
   * 布局，center 代表垂直居中
   */
  layout?: 'default' | 'center';
  /**
   * 加载中
   */
  loading?: boolean | ReactNode;
  /**
   * 栅格布局宽度，24 栅格，支持指定宽度或百分，需要支持响应式 colSpan={{ xs: 12, sm: 6 }}
   */
  colSpan?: ColSpanType | Partial<Record<Breakpoint, ColSpanType>>;
  /**
   * 栅格间距
   */
  gutter?: Gutter | Gutter[];
  /**
   * 拆分卡片方式
   */
  split?: 'vertical' | 'horizontal';
  /**
   * 是否有边框
   */
  bordered?: boolean;
  /**
   * 幽灵模式，即是否取消卡片内容区域的 padding 和 背景颜色。
   */
  ghost?: boolean;
  /**
   * 是否可折叠
   */
  collapsible?: boolean;
  /**
   * 受控 collapsed 属性
   */
  collapsed?: boolean;
  /**
   * 配置默认是否折叠
   */
  defaultCollapsed?: boolean;
  /**
   * 收起卡片的事件
   */
  onCollapse?: (collapsed: boolean) => void;
};

const ProCard: ProCardType = (props) => {
  const {
    className,
    style,
    bodyStyle = {},
    headStyle = {},
    title,
    extra,
    tip,
    layout,
    loading,
    colSpan,
    gutter = 0,
    split,
    headerBordered = false,
    bordered = false,
    children,
    ghost = false,
    collapsed: controlCollapsed,
    collapsible = false,
    defaultCollapsed = false,
    onCollapse,
  } = props;

  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useMergedState<boolean>(defaultCollapsed, {
    value: controlCollapsed,
    onChange: onCollapse,
  });

  // 顺序决定如何进行响应式取值，按最大响应值依次取值，请勿修改。
  const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

  /**
   * 根据响应式获取 gutter, 参考 antd 实现
   * @param gutter gutter
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
   * @param withStyle 是否符合条件
   * @param appendStyle 如果符合条件要返回的 style 属性
   */
  const getStyle = (withStyle: boolean, appendStyle: React.CSSProperties) => {
    return withStyle ? appendStyle : {};
  };

  return (
    <ConfigConsumer>
      {({ getPrefixCls }: ConfigConsumerProps) => {
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
          [`${prefixCls}-span-${span}`]: typeof span === 'number' && span > 0 && span <= 24,
          [`${prefixCls}-border`]: bordered,
          [`${prefixCls}-contain-card`]: containProCard,
          [`${prefixCls}-loading`]: loading,
          [`${prefixCls}-split`]: split === 'vertical' || split === 'horizontal',
          [`${prefixCls}-ghost`]: ghost,
        });

        const headerCls = classNames(`${prefixCls}-header`, {
          [`${prefixCls}-header-border`]: headerBordered,
          [`${prefixCls}-header-collapse`]: collapsed,
        });

        const bodyCls = classNames(`${prefixCls}-body`, {
          [`${prefixCls}-body-center`]: layout === 'center',
          [`${prefixCls}-body-column`]: split === 'horizontal',
          [`${prefixCls}-body-collapse`]: collapsed,
          [`${prefixCls}-body-ghost`]: ghost,
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
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        );

        return (
          <div className={cardCls} style={cardStyle}>
            {(title || extra || collapsibleButton) && (
              <div className={headerCls} style={headStyle}>
                <div className={`${prefixCls}-title`}>
                  <LabelIconTip label={title} tip={tip} />
                  {collapsibleButton}
                </div>
                <div className={`${prefixCls}-extra`}>{extra}</div>
              </div>
            )}
            <div className={bodyCls} style={bodyStyle}>
              {loading ? loadingDOM : childrenModified}
            </div>
          </div>
        );
      }}
    </ConfigConsumer>
  );
};

ProCard.isProCard = true;

export default ProCard;
