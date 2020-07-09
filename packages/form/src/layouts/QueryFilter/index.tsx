import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, version, Form } from 'antd';
import ResizeObserver from 'rc-resize-observer';
import { FormProps } from 'antd/lib/form';
import classNames from 'classnames';
import React, {
  Component,
  ReactNode,
  ReactElement,
  MouseEventHandler,
} from 'react';

import { getPrefixCls } from '@ant-design/pro-utils';
import './index.less';

/**
 * 配置表单列变化的容器宽度断点
 */
const BREAKPOINTS = {
  vertical: [
    513, // 一列
    785, // 两列
    1062, // 三列，超出变四列
  ],
  default: [
    513, // 一列
    701, // 两列
    1063, // 三列，超出变四列
  ],
};

export interface AdvancedQueryProps
  extends Omit<FormProps, 'labelCol' | 'wrapperCol' | 'layout'> {
  /**
   * 点击重设按钮时的回调（自定义操作区域时无法生效）
   */
  onReset?: MouseEventHandler<any>;
  /**
   * 切换折叠状态时的回调
   */
  onCollapse?: (collapsed: boolean) => void;
  /**
   * 默认的折叠状态
   */
  defaultCollapsed?: boolean;
  /**
   * 当前的折叠状态
   */
  collapsed?: boolean;
  /**
   * 标签展示模式
   */
  labelLayout?: 'default' | 'growth' | 'vertical';
  /**
   * 自定义 CSS classname 前缀
   */
  prefixCls?: string;
  /**
   * 默认显示的表单控件数量
   */
  defaultColsNumber?: number;
  /**
   * ref 透传
   */
  forwardRef?: React.Ref<any>;
}

class InnerAdvancedQuery extends Component<AdvancedQueryProps> {
  state = {
    /**
     * 每行最多显示多少列表单组件
     */
    colsInRow: 1,
    /**
     * 是否处于折叠状态
     */
    isCollapsed: true,
    /**
     * 是否有溢出需要折叠的表单项
     */
    isOverflow: false,
    /**
     * 组件的 CSS classname 前缀
     */
    prefixCls: '',
    /**
     * 子节点数量，由于 Fragment 包裹会影响 children.length 的判断，所以这里需要单独做计算
     */
    childrenCount: 0,
  };

  /**
   * 声明容器的 ref
   */
  wrapperRef = React.createRef<HTMLDivElement>();

  /**
   * 声明操作区域的 ref
   */
  actionRef = React.createRef<HTMLDivElement>();

  static getDerivedStateFromProps(
    { children = [], prefixCls, defaultColsNumber }: AdvancedQueryProps,
    // @ts-expect-error TODO
    { colsInRow },
  ) {
    const overflowNumber = defaultColsNumber || colsInRow - 1 || 1;
    const childrenCount = InnerAdvancedQuery.getChildrenCount(children);

    return {
      childrenCount,
      // 比对子节点数量及当前宽度可展示的表单列数量，设置是否有折叠项
      isOverflow: childrenCount > overflowNumber,
      prefixCls: getPrefixCls('form-query-filter', prefixCls),
    };
  }

  static getChildrenCount(children: ReactNode = []): number {
    let count = 0;

    // @ts-expect-error
    [].concat(children).forEach(item => {
      if ((item as ReactElement).type === React.Fragment) {
        // 从 React Fragment 中将 children 铺开计算数量
        count += InnerAdvancedQuery.getChildrenCount(
          (item as ReactElement).props?.children,
        );
      } else if (Array.isArray(item)) {
        // 从 React Element 数组中将 children 铺开计算数量
        count += InnerAdvancedQuery.getChildrenCount(item);
      } else {
        count += 1;
      }
    });

    return count;
  }

  /**
   * 获取按指定数量筛选后的子节点数组
   * @param children  子节点
   * @param count     需要筛选的数量
   */
  static getSlicedChildren(
    children: ReactNode = [],
    count: number,
  ): ReactNode[] {
    const result = [];

    [].concat(children).some(item => {
      // 筛选数量足够时停止筛选
      if (result.length === count) {
        return true;
      }

      if ((item as ReactElement).type === React.Fragment) {
        // 在 React Fragment 中筛选
        result.push(
          ...InnerAdvancedQuery.getSlicedChildren(
            (item as ReactElement).props?.children,
            count - result.length,
          ),
        );
      } else if (Array.isArray(item)) {
        // 在 React Element 数组中筛选
        result.push(
          ...InnerAdvancedQuery.getSlicedChildren(item, count - result.length),
        );
      } else {
        result.push(item);
      }

      return false;
    });

    return result;
  }

  componentDidMount() {
    const { defaultCollapsed } = this.props;

    this.updateColsInRow();

    if (typeof defaultCollapsed === 'boolean') {
      this.setState({ isCollapsed: defaultCollapsed });
    }
  }

  /**
   * 根据视口宽度计算当前单行最多显示多少列表单组件
   */
  updateColsInRow = () => {
    const { labelLayout } = this.props;

    this.setState({
      // 响应式断点的索引值 +1 正好为该断点对应列数
      // 倘若容器宽度超过最大断点返回值为 -1，此时 +1 正好归零，『或语句』会取后置值
      colsInRow:
        (BREAKPOINTS[labelLayout] || BREAKPOINTS.default).findIndex(
          item => this.wrapperRef.current.offsetWidth < item,
        ) + 1 || 4,
    });
  };

  /**
   * 处理表单折叠按钮点击事件
   */
  handleToggleClick = () => {
    const { isCollapsed } = this.state;
    const { onCollapse, collapsed = isCollapsed } = this.props;

    this.setState({
      isCollapsed: !collapsed,
    });

    if (typeof onCollapse === 'function') {
      onCollapse(!collapsed);
    }
  };

  /**
   * 渲染操作区域
   */
  renderActionArea = () => {
    const {
      isOverflow,
      prefixCls,
      isCollapsed,
      colsInRow,
      childrenCount,
    } = this.state;
    const { onReset } = this.props;
    const isSingleLine = childrenCount < colsInRow;

    return (
      <div
        className={`${prefixCls}-action-area`}
        ref={this.actionRef}
        data-single-line={isSingleLine || undefined}
        // 仅 care major 避免 snapshot 报错 4.3.3 -> 4
        data-antd={parseInt(version, 10)}
      >
        {onReset && <Button onClick={onReset}>Reset</Button>}
        <Button type="primary" htmlType="submit">
          Query
        </Button>
        {/* 仅在有超出单行展示的表单项时才显示收起/折叠按钮 */}
        {isOverflow && (
          <Button
            className={`${prefixCls}-toggle-btn`}
            onClick={this.handleToggleClick}
            size="small"
            shape="circle"
          >
            {/* 后续 tech-ui 会接入国际化，所以此处不开放 props 进行文本修改 */}
            {isCollapsed ? (
              <>
                Expand <DownOutlined />
              </>
            ) : (
              <>
                Collapse <UpOutlined />
              </>
            )}
          </Button>
        )}
      </div>
    );
  };

  render() {
    const { colsInRow, isCollapsed, isOverflow, prefixCls } = this.state;
    const {
      children = [],
      labelLayout = 'default',
      hideRequiredMark = true,
      collapsed = isCollapsed,
      className,
      style,
      // Omit 以下属性到 Form 组件
      onReset,
      onCollapse,
      defaultCollapsed,
      // Omit 以上属性到 Form 组件
      defaultColsNumber,
      forwardRef,
      ...props
    } = this.props;
    // 隐藏时按每行最大列数减一进行显示，为操作区留出空间，但最少要显示一列,在有默认显示的表单控件数量时优先使用
    const colsNumber = Math.max(defaultColsNumber || colsInRow - 1, 1);
    const filteredChildren =
      isOverflow && collapsed
        ? InnerAdvancedQuery.getSlicedChildren(
            children as ReactNode[],
            colsNumber,
          )
        : children;
    // 当普通布局模式下容器宽度小于最小断点时，强制使用 label/控件上下布局
    const forceVertical =
      this.wrapperRef.current?.offsetWidth < BREAKPOINTS.default[1] &&
      'vertical';

    return (
      // 利用 ResizeObserver 监听表单容器变化
      <ResizeObserver onResize={this.updateColsInRow}>
        <div
          ref={this.wrapperRef}
          className={classNames(
            prefixCls,
            collapsed && `${prefixCls}-collapsed`,
            className,
          )}
          style={style}
          data-cols={colsInRow}
          data-label-layout={forceVertical || labelLayout}
        >
          <Form
            {...props}
            layout="inline"
            hideRequiredMark={hideRequiredMark}
            // 防止外部复写该 labelCol 和 wrapperCol 属性
            labelCol={undefined}
            wrapperCol={undefined}
            ref={forwardRef}
          >
            {filteredChildren}
            {this.renderActionArea()}
          </Form>
        </div>
      </ResizeObserver>
    );
  }
}

// TODO i18n
export default InnerAdvancedQuery;
