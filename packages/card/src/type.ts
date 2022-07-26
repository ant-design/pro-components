import type { TabPaneProps, TabsProps } from 'antd';
import type { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import type { ReactNode } from 'react';

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type Gutter = number | Partial<Record<Breakpoint, number>>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type ProCardTabsProps = {} & TabsProps;

export type ColSpanType = number | string;

export type CardProps = {
  /** 标题样式 */
  headStyle?: React.CSSProperties;
  /** 内容样式 */
  bodyStyle?: React.CSSProperties;
  /** 页头是否有分割线 */
  headerBordered?: boolean;
  /** 卡片标题 */
  title?: React.ReactNode;
  /** 副标题 */
  subTitle?: React.ReactNode;
  /** 标题说明 */
  tooltip?: string | LabelTooltipType;
  /** @deprecated 你可以使用 tooltip，这个更改是为了与 antd 统一 */
  tip?: string;
  /** 右上角自定义区域 */
  extra?: React.ReactNode;
  /** 布局，center 代表垂直居中 */
  layout?: 'default' | 'center';
  /** 卡片类型 */
  type?: 'default' | 'inner';
  /** 指定 Flex 方向，仅在嵌套子卡片时有效 */
  direction?: 'column' | 'row';
  /** 是否自动换行，仅在嵌套子卡片时有效 */
  wrap?: boolean;
  /** 尺寸 */
  size?: 'default' | 'small';
  /** 加载中 */
  loading?: boolean | ReactNode;
  /** 栅格布局宽度，24 栅格，支持指定宽度或百分，需要支持响应式 colSpan={{ xs: 12, sm: 6 }} */
  colSpan?: ColSpanType | Partial<Record<Breakpoint, ColSpanType>>;
  /** 栅格间距 */
  gutter?: Gutter | Gutter[];
  /** 操作按钮 */
  actions?: React.ReactNode[];
  /** 拆分卡片方式 */
  split?: 'vertical' | 'horizontal';
  /** 是否有边框 */
  bordered?: boolean;
  /**
   * 鼠标移过时可浮起
   *
   * @default false
   */
  hoverable?: boolean;
  /** 幽灵模式，即是否取消卡片内容区域的 padding 和 背景颜色。 */
  ghost?: boolean;
  /** 是否可折叠 */
  collapsible?: boolean;
  /** 受控 collapsed 属性 */
  collapsed?: boolean;
  /** 折叠按钮自定义节点 */
  collapsibleIconRender?: ({ collapsed }: { collapsed: boolean }) => React.ReactNode;
  /** 配置默认是否折叠 */
  defaultCollapsed?: boolean;
  /** 收起卡片的事件 */
  onCollapse?: (collapsed: boolean) => void;
  /** 标签栏配置 */
  tabs?: ProCardTabsProps;
  /** 前缀 */
  prefixCls?: string;
  /** ProCard 的 ref */
  ref?: React.Ref<HTMLDivElement | undefined>;
  /** 是否展示选中样式 */
  checked?: boolean;
  /** 选中改变 */
  onChecked?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;

export type ProCardTabPaneProps = {
  /** Key */
  key?: string;
  /** ProCard 相关属性透传 */
  cardProps?: CardProps;
} & TabPaneProps;

export type CardType = React.ForwardRefExoticComponent<CardProps>;
