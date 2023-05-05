/* eslint-disable no-param-reassign */
import { ProProvider, useIntl } from '@ant-design/pro-provider';
import { isBrowser, useMountMergeState } from '@ant-design/pro-utils';
import type { ColProps, FormItemProps, RowProps } from 'antd';
import { Col, ConfigProvider, Form, Row } from 'antd';
import type { FormInstance, FormProps } from 'antd/lib/form/Form';
import classNames from 'classnames';
import RcResizeObserver from 'rc-resize-observer';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { ReactElement } from 'react';
import React, { useContext, useMemo } from 'react';
import type { CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import type { ActionsProps } from './Actions';
import Actions from './Actions';
import { useStyle } from './style';

const CONFIG_SPAN_BREAKPOINTS = {
  xs: 513,
  sm: 513,
  md: 785,
  lg: 992,
  xl: 1057,
  xxl: Infinity,
};
/** 配置表单列变化的容器宽度断点 */
const BREAKPOINTS = {
  vertical: [
    // [breakpoint, cols, layout]
    [513, 1, 'vertical'],
    [785, 2, 'vertical'],
    [1057, 3, 'vertical'],
    [Infinity, 4, 'vertical'],
  ],
  default: [
    [513, 1, 'vertical'],
    [701, 2, 'vertical'],
    [1062, 3, 'horizontal'],
    [1352, 3, 'horizontal'],
    [Infinity, 4, 'horizontal'],
  ],
};

/**
 * 合并用户和默认的配置
 *
 * @param layout
 * @param width
 */
const getSpanConfig = (
  layout: FormProps['layout'],
  width: number,
  span?: SpanConfig,
): { span: number; layout: FormProps['layout'] } => {
  if (span && typeof span === 'number') {
    return {
      span,
      layout,
    };
  }

  const spanConfig = span
    ? ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map((key) => [
        CONFIG_SPAN_BREAKPOINTS[key],
        24 / span[key],
        'horizontal',
      ])
    : BREAKPOINTS[layout || 'default'];

  const breakPoint = (spanConfig || BREAKPOINTS.default).find(
    (item: [number, number, FormProps['layout']]) => width < item[0] + 16, // 16 = 2 * (ant-row -8px margin)
  );
  return {
    span: 24 / breakPoint[1],
    layout: breakPoint[2],
  };
};

export type SpanConfig =
  | number
  | {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };

export type BaseQueryFilterProps = Omit<
  ActionsProps,
  'submitter' | 'setCollapsed' | 'isForm'
> & {
  className?: string;
  defaultCollapsed?: boolean;
  /**
   * @name layout 的布局设置
   * @type 'horizontal' | 'inline' | 'vertical';
   */
  layout?: FormProps['layout'];
  defaultColsNumber?: number;
  /**
   * @name 文字标签的宽度
   *
   * @example 文字标签宽 80 ，一般用于只有两个字
   * labelWidth={80}
   * @example 文字标签宽 140 ，一般用于有四个字
   * labelWidth={140}
   * @example 自动计算，会导致不整齐
   * labelWidth="auto"
   */
  labelWidth?: number | 'auto';
  /**
   * @name 每一行之前要不要有分割线
   * @description 只有在 `layout` 为 `vertical` 时生效
   */
  split?: boolean;
  /**
   * @name 配置列数，一般而言是 8 的倍数
   *
   * @example 配置一行4个
   * span={6}
   *
   * @example 配置一行3个
   * span={6}
   *
   * @example 根据屏幕宽度配置
   * span={xs: 24, sm: 12, md: 8, lg: 6, xl: 6, xxl: 6}
   * */
  span?: SpanConfig;

  /**
   * @name 查询按钮的文本
   *  */
  searchText?: string;
  /**
   * @name 重置按钮的文本
   */
  resetText?: string;
  /**
   * @name 查询表单栅格间隔
   *
   * @example searchGutter={24}
   * */
  searchGutter?: RowProps['gutter'];
  form?: FormProps['form'];
  /**
   * @param searchConfig 基础的配置
   * @param props 更加详细的配置 {
   *     type?: 'form' | 'list' | 'table' | 'cardList' | undefined;
   *     form: FormInstance;
   *     submit: () => void;
   *     collapse: boolean;
   *     setCollapse: (collapse: boolean) => void;
   *     showCollapseButton: boolean; }
   * @name 底部操作栏的 render
   *
   *
   * @example 增加一个清空按钮
   * optionRender={(searchConfig, props, dom) =>[ <a key="clear">清空</a>,...dom]}
   *
   * @example 增自定义提交
   *
   * optionRender={(searchConfig) => [<a key="submit" onClick={()=> searchConfig?.form?.submit()}>提交</a>]}
   */
  optionRender?:
    | ((
        searchConfig: Omit<BaseQueryFilterProps, 'submitter' | 'isForm'>,
        props: Omit<BaseQueryFilterProps, 'searchConfig'>,
        dom: React.ReactNode[],
      ) => React.ReactNode[])
    | false;
  /**
   * @name 忽略 Form.Item rule规则配置
   */
  ignoreRules?: boolean;
  /**
   * @name 是否显示 collapse 隐藏个数
   */
  showHiddenNum?: boolean;

  // submitterColSpanProps 是一个可选属性，类型为一个对象。
  // 该对象使用 Omit 泛型去除了 ColProps 中的 'span' 属性，并新增了一个 'span' 属性，类型为 number 类型。
  // 也就是说，submitterColSpanProps 对象除了 'span' 属性外，还可以包含 ColProps 中的其他所有属性。
  submitterColSpanProps?: Omit<ColProps, 'span'> & {
    span: number;
  };
};

const flatMapItems = (
  items: React.ReactNode[],
  ignoreRules?: boolean,
): React.ReactNode[] => {
  return items.flatMap((item: any) => {
    if (item?.type.displayName === 'ProForm-Group' && !item.props?.title) {
      return item.props.children;
    }
    if (ignoreRules && React.isValidElement(item)) {
      return React.cloneElement(item, {
        ...(item.props as any),
        formItemProps: {
          ...(item.props as any)?.formItemProps,
          rules: [],
        },
      });
    }
    return item;
  });
};

export type QueryFilterProps<T = Record<string, any>> = Omit<
  FormProps<T>,
  'onFinish'
> &
  CommonFormProps<T> &
  BaseQueryFilterProps & {
    onReset?: (values: T) => void;
  };

const QueryFilterContent: React.FC<{
  defaultCollapsed: boolean;
  onCollapse?: (collapsed: boolean) => void;
  collapsed?: boolean;
  resetText?: string;
  searchText?: string;
  searchGutter?: RowProps['gutter'];
  split?: boolean;
  form: FormInstance<any>;
  items: React.ReactNode[];
  submitter?: JSX.Element | false;
  showLength: number;
  collapseRender: QueryFilterProps<any>['collapseRender'];
  spanSize: {
    span: number;
    layout: FormProps['layout'];
  };
  // submitterColSpanProps 是一个可选属性，类型为一个对象。
  // 该对象使用 Omit 泛型去除了 ColProps 中的 'span' 属性，并新增了一个 'span' 属性，类型为 number 类型。
  // 也就是说，submitterColSpanProps 对象除了 'span' 属性外，还可以包含 ColProps 中的其他所有属性。
  submitterColSpanProps?: Omit<ColProps, 'span'> & {
    span: number;
  };
  baseClassName: string;
  optionRender: BaseQueryFilterProps['optionRender'];
  ignoreRules?: boolean;
  preserve?: boolean;
  showHiddenNum?: boolean;
}> = (props) => {
  const intl = useIntl();
  const { hashId } = useContext(ProProvider);
  const resetText =
    props.resetText || intl.getMessage('tableForm.reset', '重置');
  const searchText =
    props.searchText || intl.getMessage('tableForm.search', '搜索');

  const [collapsed, setCollapsed] = useMergedState<boolean>(
    () => props.defaultCollapsed && !!props.submitter,
    {
      value: props.collapsed,
      onChange: props.onCollapse,
    },
  );

  const {
    optionRender,
    collapseRender,
    split,
    items,
    spanSize,
    showLength,
    searchGutter,
    showHiddenNum,
  } = props;

  const submitter = useMemo(() => {
    if (!props.submitter || optionRender === false) {
      return null;
    }
    return React.cloneElement(props.submitter, {
      searchConfig: {
        resetText,
        submitText: searchText,
      },
      render: optionRender
        ? (_: any, dom: React.ReactNode[]) =>
            optionRender(
              {
                ...props,
                resetText,
                searchText,
              },
              props,
              dom,
            )
        : optionRender,
      ...props.submitter.props,
    });
  }, [props, resetText, searchText, optionRender]);

  // totalSpan 统计控件占的位置，计算 offset 保证查询按钮在最后一列
  let totalSpan = 0;
  let itemLength = 0;
  //首个表单项是否占满第一行
  let firstRowFull = false;
  // totalSize 统计控件占的份数
  let totalSize = 0;

  // for split compute
  let currentSpan = 0;

  // 处理过，包含是否需要隐藏的 数组
  const processedList = flatMapItems(items, props.ignoreRules).map(
    (
      item,
      index,
    ): { itemDom: React.ReactNode; hidden: boolean; colSpan: number } => {
      // 如果 formItem 自己配置了 hidden，默认使用它自己的
      const colSize = React.isValidElement<any>(item)
        ? item?.props?.colSize ?? 1
        : 1;
      const colSpan = Math.min(spanSize.span * (colSize || 1), 24);
      // 计算总的 totalSpan 长度
      totalSpan += colSpan;
      // 计算总的 colSize 长度
      totalSize += colSize;

      if (index === 0) {
        firstRowFull =
          colSpan === 24 &&
          !(item as ReactElement<{ hidden: boolean }>)?.props?.hidden;
      }

      const hidden: boolean =
        (item as ReactElement<{ hidden: boolean }>)?.props?.hidden ||
        // 如果收起了
        (collapsed &&
          (firstRowFull ||
            // 如果 超过显示长度 且 总长度超过了 24
            totalSize > showLength - 1) &&
          !!index &&
          totalSpan >= 24);

      itemLength += 1;

      const itemKey =
        (React.isValidElement(item) &&
          (item.key || `${(item.props as Record<string, any>)?.name}`)) ||
        index;

      if (React.isValidElement(item) && hidden) {
        if (!props.preserve) {
          return {
            itemDom: null,
            colSpan: 0,
            hidden: true,
          };
        }
        return {
          itemDom: React.cloneElement(item, {
            hidden: true,
            key: itemKey || index,
          } as Record<string, any>),
          hidden: true,
          colSpan,
        };
      }

      return {
        itemDom: item,
        colSpan,
        hidden: false,
      };
    },
  );

  const doms = processedList.map((itemProps, index: number) => {
    const { itemDom, colSpan } = itemProps;
    const hidden: boolean = (itemDom as ReactElement<{ hidden: boolean }>)
      ?.props?.hidden;

    if (hidden) return itemDom;

    // 每一列的key, 一般是存在的
    const itemKey =
      (React.isValidElement(itemDom) &&
        (itemDom.key || `${itemDom.props?.name}`)) ||
      index;

    if (24 - (currentSpan % 24) < colSpan) {
      // 如果当前行空余位置放不下，那么折行
      totalSpan += 24 - (currentSpan % 24);
      currentSpan += 24 - (currentSpan % 24);
    }

    currentSpan += colSpan;

    if (split && currentSpan % 24 === 0 && index < itemLength - 1) {
      return (
        <Col
          key={itemKey}
          span={colSpan}
          className={`${props.baseClassName}-row-split-line ${props.baseClassName}-row-split ${hashId}`}
        >
          {itemDom}
        </Col>
      );
    }

    return (
      <Col
        key={itemKey}
        className={`${props.baseClassName}-row-split ${hashId}`}
        span={colSpan}
      >
        {itemDom}
      </Col>
    );
  });

  const hiddenNum =
    showHiddenNum && processedList.filter((item) => item.hidden).length;

  /** 是否需要展示 collapseRender */
  const needCollapseRender = useMemo(() => {
    if (totalSpan < 24 || totalSize <= showLength) {
      return false;
    }
    return true;
  }, [totalSize, showLength, totalSpan]);

  const offset = useMemo(() => {
    const offsetSpan =
      (currentSpan % 24) + (props.submitterColSpanProps?.span ?? spanSize.span);
    if (offsetSpan > 24) {
      return 24 - (props.submitterColSpanProps?.span ?? spanSize.span);
    }
    return 24 - offsetSpan;
  }, [
    currentSpan,
    (currentSpan % 24) + (props.submitterColSpanProps?.span ?? spanSize.span),
    props.submitterColSpanProps?.span,
  ]);

  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-query-filter');
  return (
    <Row
      gutter={searchGutter}
      justify="start"
      className={classNames(`${baseClassName}-row`, hashId)}
      key="resize-observer-row"
    >
      {doms}
      {submitter && (
        <Col
          key="submitter"
          span={spanSize.span}
          offset={offset}
          className={classNames(props.submitterColSpanProps?.className)}
          {...props.submitterColSpanProps}
          style={{
            textAlign: 'end',
          }}
        >
          <Form.Item
            label=" "
            colon={false}
            className={`${baseClassName}-actions ${hashId}`}
          >
            <Actions
              hiddenNum={hiddenNum}
              key="pro-form-query-filter-actions"
              collapsed={collapsed}
              collapseRender={needCollapseRender ? collapseRender : false}
              submitter={submitter}
              setCollapsed={setCollapsed}
            />
          </Form.Item>
        </Col>
      )}
    </Row>
  );
};

const defaultWidth = isBrowser() ? document?.body?.clientWidth : 1024;

function QueryFilter<T = Record<string, any>>(props: QueryFilterProps<T>) {
  const {
    collapsed: controlCollapsed,
    layout,
    defaultCollapsed = true,
    defaultColsNumber,
    span,
    searchGutter = 24,
    searchText,
    resetText,
    optionRender,
    collapseRender,
    onReset,
    onCollapse,
    labelWidth = '80',
    style,
    split,
    preserve = true,
    ignoreRules,
    showHiddenNum = false,
    submitterColSpanProps,
    ...rest
  } = props;

  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-query-filter');
  const { wrapSSR, hashId } = useStyle(baseClassName);

  const [width, setWidth] = useMountMergeState(
    () =>
      (typeof style?.width === 'number'
        ? style?.width
        : defaultWidth) as number,
  );

  const spanSize = useMemo(
    () => getSpanConfig(layout, width + 16, span),
    [layout, width, span],
  );

  const showLength = useMemo(() => {
    // 查询重置按钮也会占一个spanSize格子，需要减掉计算
    if (defaultColsNumber !== undefined) {
      return defaultColsNumber - 1;
    }
    return Math.max(1, 24 / spanSize.span - 1);
  }, [defaultColsNumber, spanSize.span]);

  /** 计算最大宽度防止溢出换行 */
  const formItemFixStyle: FormItemProps<any> | undefined = useMemo(() => {
    if (labelWidth && spanSize.layout !== 'vertical' && labelWidth !== 'auto') {
      return {
        labelCol: {
          flex: `0 0 ${labelWidth}px`,
        },
        wrapperCol: {
          style: {
            maxWidth: `calc(100% - ${labelWidth}px)`,
          },
        },
        style: {
          flexWrap: 'nowrap',
        },
      };
    }
    return undefined;
  }, [spanSize.layout, labelWidth]);

  return wrapSSR(
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        if (width !== offset.width && offset.width > 17) {
          setWidth(offset.width);
        }
      }}
    >
      <BaseForm
        isKeyPressSubmit
        preserve={preserve}
        {...rest}
        className={classNames(baseClassName, hashId, rest.className)}
        onReset={onReset}
        style={style}
        layout={spanSize.layout}
        fieldProps={{
          style: {
            width: '100%',
          },
        }}
        formItemProps={formItemFixStyle}
        groupProps={{
          titleStyle: {
            display: 'inline-block',
            marginInlineEnd: 16,
          },
        }}
        contentRender={(items, renderSubmitter, form) => (
          <QueryFilterContent
            spanSize={spanSize}
            collapsed={controlCollapsed}
            form={form}
            submitterColSpanProps={submitterColSpanProps}
            collapseRender={collapseRender}
            defaultCollapsed={defaultCollapsed}
            onCollapse={onCollapse}
            optionRender={optionRender}
            submitter={renderSubmitter}
            items={items}
            split={split}
            baseClassName={baseClassName}
            resetText={props.resetText}
            searchText={props.searchText}
            searchGutter={searchGutter}
            preserve={preserve}
            ignoreRules={ignoreRules}
            showLength={showLength}
            showHiddenNum={showHiddenNum}
          />
        )}
      />
    </RcResizeObserver>,
  );
}

export { QueryFilter };
