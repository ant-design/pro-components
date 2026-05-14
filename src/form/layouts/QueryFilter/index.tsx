import RcResizeObserver from '@rc-component/resize-observer';
import { useControlledState } from '@rc-component/util';
import type { ColProps, FormItemProps, RowProps } from 'antd';
import { Col, ConfigProvider, Form, Row, theme } from 'antd';
import type { FormInstance, FormProps } from 'antd/lib/form/Form';
import { clsx } from 'clsx';
import type { ReactElement } from 'react';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { ProProvider, useIntl } from '../../../provider';
import { isBrowser, useRefFunction } from '../../../utils';
import type { CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import type { ActionsProps } from './Actions';
import Actions from './Actions';
import {
  calcSubmitterOffset,
  processQueryFilterItems,
} from './processQueryFilterItems';
import { useStyle } from './style';

type BreakpointsConfig = {
  breakpoints: {
    vertical: (string | number)[][];
    default: (string | number)[][];
  };
  configSpanBreakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
};

/** 从 antd 设计 token 获取断点配置，与 Grid 响应式布局保持一致 */
const getBreakpointsConfig = (token: {
  screenSMMin?: number;
  screenMDMin?: number;
  screenLGMin?: number;
  screenXLMin?: number;
  screenXXLMin?: number;
}): BreakpointsConfig => {
  const defaultToken = theme.getDesignToken();
  const t = { ...defaultToken, ...token };
  const bp = {
    xs: t.screenSMMin ?? 576,
    sm: t.screenMDMin ?? 768,
    md: t.screenLGMin ?? 992,
    lg: t.screenXLMin ?? 1200,
    xl: t.screenXXLMin ?? 1600,
    xxl: Infinity,
  } as const;

  return {
    configSpanBreakpoints: bp,
    breakpoints: {
      vertical: [
        [bp.xs, 1, 'vertical'],
        [bp.md, 2, 'vertical'],
        [bp.xl, 3, 'vertical'],
        [Infinity, 4, 'vertical'],
      ],
      default: [
        [bp.xs, 1, 'vertical'],
        [bp.sm, 2, 'vertical'],
        [bp.xl, 3, 'horizontal'],
        [Infinity, 4, 'horizontal'],
      ],
    },
  };
};

/**
 * 合并用户和默认的配置
 *
 * @param layout
 * @param width
 * @param breakpointsConfig 从 theme.useToken() 获取，支持 ConfigProvider 主题定制
 */
const getSpanConfig = (
  layout: FormProps['layout'],
  width: number,
  span: SpanConfig | undefined,
  breakpointsConfig: BreakpointsConfig,
): { span: number; layout: FormProps['layout'] } => {
  if (span && typeof span === 'number') {
    return {
      span,
      layout,
    };
  }

  const { breakpoints, configSpanBreakpoints } = breakpointsConfig;
  const spanConfig: (string | number)[][] = span
    ? (['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map((key) => [
        configSpanBreakpoints[key],
        24 / (span as Record<string, number>)[key],
        'horizontal',
      ])
    : breakpoints[(layout as 'default') || 'default'];

  const breakPoint = (spanConfig || breakpoints.default).find(
    (item) => width < (item[0] as number) + 16, // 16 = 2 * (ant-row -8px margin)
  );

  if (!breakPoint) {
    return {
      span: 8,
      layout: 'horizontal',
    };
  }
  return {
    span: 24 / (breakPoint[1] as number),
    layout: breakPoint?.[2] as 'horizontal',
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
  /**
   * @name 默认一行显示几个表单项
   */
  defaultColsNumber?: number;
  /**
   * @name 默认展示几个表单项
   */
  defaultFormItemsNumber?: number;
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
   * span={8}
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
  containerStyle?: React.CSSProperties;
};

export type QueryFilterProps<
  T = Record<string, any>,
  U = Record<string, any>,
> = Omit<FormProps<T>, 'onFinish'> &
  CommonFormProps<T, U> &
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
  submitter?: React.JSX.Element | false;
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

  const [collapsed, setCollapsedInner] = useControlledState<boolean>(
    () => props.defaultCollapsed && !!props.submitter,
    props.collapsed,
  );

  /**
   * 使用 useRefFunction 包装回调，确保引用稳定
   */
  const onCollapseCallback = useRefFunction((c: boolean) => {
    props.onCollapse?.(c);
  });

  /**
   * 使用 queueMicrotask 延迟回调调用，避免在渲染阶段调用外部回调导致的 React 警告
   * "Cannot update a component while rendering a different component"
   */
  const setCollapsed = useCallback(
    (updater: boolean | ((prev: boolean) => boolean)) => {
      setCollapsedInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: boolean) => boolean)(prev)
            : updater;
        queueMicrotask(() => {
          onCollapseCallback(next);
        });
        return next;
      });
    },
    [onCollapseCallback],
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

  // 通过纯函数计算布局信息，消除组件渲染阶段的命令式 let 变量
  const { processedList, totalSpan, totalSize, lastRowUsedSpan } =
    processQueryFilterItems({
      items,
      spanSize,
      collapsed,
      showLength,
      preserve: props.preserve,
      ignoreRules: props.ignoreRules,
    });

  // 渲染 Col 列表：根据 processedList 生成带 split 线的布局
  let renderSpan = 0;
  const doms = processedList.map((itemProps, index: number) => {
    const { itemDom, colSpan } = itemProps;
    const hidden: boolean = (itemDom as ReactElement<{ hidden: boolean }>)
      ?.props?.hidden;

    if (hidden) return itemDom;

    const itemKey =
      (React.isValidElement(itemDom) &&
        (itemDom.key || `${itemDom.props?.name}`)) ||
      index;

    // 当前行剩余位置放不下时折行
    if (24 - (renderSpan % 24) < colSpan) {
      renderSpan += 24 - (renderSpan % 24);
    }
    renderSpan += colSpan;

    const isSplitLine =
      split && renderSpan % 24 === 0 && index < processedList.length - 1;

    return (
      <Col
        key={itemKey}
        span={colSpan}
        className={clsx(
          `${props.baseClassName}-row-split`,
          isSplitLine && `${props.baseClassName}-row-split-line`,
          hashId,
        )}
      >
        {itemDom}
      </Col>
    );
  });

  const hiddenNum =
    showHiddenNum && processedList.filter((item) => item.hidden).length;

  const needCollapseRender = totalSpan >= 24 && totalSize > showLength;

  const offset = calcSubmitterOffset(
    lastRowUsedSpan,
    props.submitterColSpanProps?.span ?? spanSize.span,
  );

  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-query-filter');
  return (
    <Row
      gutter={searchGutter}
      justify="start"
      className={clsx(`${baseClassName}-row`, hashId)}
      key="resize-observer-row"
    >
      {doms}
      {submitter && (
        <Col
          key="submitter"
          span={spanSize.span}
          offset={offset}
          className={clsx(props.submitterColSpanProps?.className)}
          {...props.submitterColSpanProps}
          style={{
            textAlign: 'end',
          }}
        >
          <Form.Item
            label=" "
            colon={false}
            shouldUpdate={false}
            className={clsx(`${baseClassName}-actions`, hashId)}
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
    defaultFormItemsNumber,
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
  const { token } = theme.useToken();

  const [width, setWidth] = useState(() =>
    typeof style?.width === 'number' ? style?.width : defaultWidth,
  );

  const breakpointsConfig = useMemo(
    () => getBreakpointsConfig(token),
    [
      token.screenSMMin,
      token.screenMDMin,
      token.screenLGMin,
      token.screenXLMin,
      token.screenXXLMin,
    ],
  );

  const spanSize = useMemo(
    () => getSpanConfig(layout, width + 16, span, breakpointsConfig),
    [layout, width, span, breakpointsConfig],
  );

  const showLength = useMemo(() => {
    if (defaultFormItemsNumber !== undefined) {
      return defaultFormItemsNumber;
    }
    if (defaultColsNumber !== undefined) {
      // 折叠为一行，需要处理多行的情况请使用 defaultFormItemsNumber
      const oneRowControlsNumber = 24 / spanSize.span - 1;
      return defaultColsNumber > oneRowControlsNumber
        ? oneRowControlsNumber
        : defaultColsNumber;
    }
    return Math.max(1, 24 / spanSize.span - 1);
  }, [defaultColsNumber, defaultFormItemsNumber, spanSize.span]);

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
      {(ref) => (
        <div
          ref={ref}
          className={clsx(`${baseClassName}-container`, hashId)}
          style={props.containerStyle}
        >
          <BaseForm
            isKeyPressSubmit
            preserve={preserve}
            {...rest}
            className={clsx(baseClassName, hashId, rest.className)}
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
        </div>
      )}
    </RcResizeObserver>,
  );
}

export { QueryFilter };
