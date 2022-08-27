import type { PopoverProps } from 'antd';
import type { MutableRefObject, ReactNode } from 'react';

export type PaginationProps = {
  /**
   * 样式，dot 仅显示指示点，index 显示当前所处位置的编号（从1开始）
   */
  theme: 'dot' | 'index';
  /**
   * 总共有几页
   */
  total: number;
  /**
   * 当前处于第几页
   */
  cur: number;
  /**
   * 是否能点击
   */
  clickabled?: boolean;
  /**
   * 点击目标页
   */
  onChange: (idx: number) => void;
  /** 展示的分页项数量 */
  showPaginationSize?: number;
};
export type ActionGuideItemProps = {
  /**
   * 当前指引项属于第几步
   */
  step: number;
  /**
   * 操作指引面板内容区的渲染函数
   */
  content: ReactNode | ((idx: number) => ReactNode);
  /**
   * 操作指引卡片显示在相对于目标元素的什么位置上
   */
  placement?: PopoverProps['placement'];
};

export type ActionGuideAction = {
  /**
   * 切换到某个面板
   */
  show: (idx: number) => void;
};

export type ActionGuideContainerProps = {
  /**
   * 操作指引的标题
   */
  title?: ReactNode | ((idx: number) => ReactNode);
  /**
   * 分页渲染器，默认时使用默认的分页器，设为 false 则不显示，可通过传入渲染方法自定义分页渲染器
   */
  pagination?: false | ((idx: number, action: ActionGuideAction) => ReactNode);
  /**
   * 是否自动滚动页面使得目标组件完全显示，默认为 true
   */
  scrollToTarget?: boolean;
  /** 打开是默认展示低级屏信息 */
  defaultIndex?: number;
  /** 分页主题 */
  paginationTheme?: PaginationProps['theme'];
  /**
   * 最多显示的分页器数量
   */
  showPaginationSize?: PaginationProps['showPaginationSize'];
  /**
   * 对外抛出的操作
   */
  actionRef?: MutableRefObject<ActionGuideAction | undefined>;
};
