/* eslint-disable no-param-reassign */
import type { ReactElement } from 'react';
import { useContext } from 'react';
import React, { useMemo } from 'react';
import { Row, Col, Form, Divider, ConfigProvider } from 'antd';
import type { FormInstance, FormProps } from 'antd/lib/form/Form';
import RcResizeObserver from 'rc-resize-observer';
import { useIntl } from '@ant-design/pro-provider';
import { isBrowser, useMountMergeState } from '@ant-design/pro-utils';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import type { CommonFormProps } from '../../BaseForm';
import BaseForm from '../../BaseForm';
import type { ActionsProps } from './Actions';
import Actions from './Actions';
import classNames from 'classnames';

import './index.less';

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
    ? Object.keys(span).map((key) => [CONFIG_SPAN_BREAKPOINTS[key], 24 / span[key], 'horizontal'])
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

export type BaseQueryFilterProps = Omit<ActionsProps, 'submitter' | 'setCollapsed' | 'isForm'> & {
  defaultCollapsed?: boolean;
  layout?: FormProps['layout'];
  defaultColsNumber?: number;
  labelWidth?: number | 'auto';
  split?: boolean;
  className?: string;
  /** 配置列数 */
  span?: SpanConfig;

  /** 查询按钮的文本 */
  searchText?: string;
  /** 重置按钮的文本 */
  resetText?: string;

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
   */
  optionRender?:
    | ((
        searchConfig: Omit<BaseQueryFilterProps, 'submitter' | 'isForm'>,
        props: Omit<BaseQueryFilterProps, 'searchConfig'>,
        dom: React.ReactNode[],
      ) => React.ReactNode[])
    | false;
  /** 忽略 Form.Item 规则 */
  ignoreRules?: boolean;
};

const flatMapItems = (items: React.ReactNode[], ignoreRules?: boolean): React.ReactNode[] => {
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

export type QueryFilterProps<T = Record<string, any>> = Omit<FormProps<T>, 'onFinish'> &
  CommonFormProps<T> &
  BaseQueryFilterProps & {
    onReset?: (values: T) => void;
  };

const QueryFilterContent: React.FC<{
  defaultCollapsed: boolean;
  onCollapse: undefined | ((collapsed: boolean) => void);
  collapsed: boolean | undefined;
  resetText: string | undefined;
  searchText: string | undefined;
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
  optionRender: BaseQueryFilterProps['optionRender'];
  ignoreRules?: boolean;
  preserve?: boolean;
}> = (props) => {
  const intl = useIntl();
  const resetText = props.resetText || intl.getMessage('tableForm.reset', '重置');
  const searchText = props.searchText || intl.getMessage('tableForm.search', '搜索');

  const [collapsed, setCollapsed] = useMergedState<boolean>(
    () => props.defaultCollapsed && !!props.submitter,
    {
      value: props.collapsed,
      onChange: props.onCollapse,
    },
  );

  const { optionRender, collapseRender, split, items, spanSize, showLength } = props;

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

  // for split compute
  let currentSpan = 0;
  const doms = flatMapItems(items, props.ignoreRules).map(
    (item: React.ReactNode, index: number) => {
      // 如果 formItem 自己配置了 hidden，默认使用它自己的
      const colSize = React.isValidElement<any>(item) ? item?.props?.colSize : 1;
      const colSpan = Math.min(spanSize.span * (colSize || 1), 24);
      // 计算总的 totalSpan 长度
      totalSpan += colSpan;
      const hidden: boolean =
        (item as ReactElement<{ hidden: boolean }>)?.props?.hidden ||
        // 如果收起了
        (collapsed &&
          // 如果 超过显示长度 且 总长度超过了 24
          index >= showLength - 1 &&
          !!index &&
          totalSpan >= 24);

      itemLength += 1;

      // 每一列的key, 一般是存在的
      const itemKey = (React.isValidElement(item) && (item.key || `${item.props?.name}`)) || index;

      if (React.isValidElement(item) && hidden) {
        if (!props.preserve) {
          return null;
        }
        return React.cloneElement(item, {
          hidden: true,
          key: itemKey || index,
        });
      }

      if (24 - (currentSpan % 24) < colSpan) {
        // 如果当前行空余位置放不下，那么折行
        totalSpan += 24 - (currentSpan % 24);
        currentSpan += 24 - (currentSpan % 24);
      }

      currentSpan += colSpan;

      const colItem = (
        <Col key={itemKey} span={colSpan}>
          {item}
        </Col>
      );
      if (split && currentSpan % 24 === 0 && index < itemLength - 1) {
        return [
          colItem,
          <Col span="24" key="line">
            <Divider style={{ marginTop: -8, marginBottom: 16 }} dashed />
          </Col>,
        ];
      }
      return colItem;
    },
  );

  /** 是否需要展示 collapseRender */
  const needCollapseRender = useMemo(() => {
    if (totalSpan < 24 || itemLength < showLength) {
      return false;
    }
    return true;
  }, [itemLength, showLength, totalSpan]);

  const offset = useMemo(() => {
    const offsetSpan = (currentSpan % 24) + spanSize.span;
    return 24 - offsetSpan;
  }, [currentSpan, spanSize.span]);

  return (
    <Row gutter={24} justify="start" key="resize-observer-row">
      {doms}
      {submitter && (
        <Col
          key="submitter"
          span={spanSize.span}
          offset={offset}
          style={{
            textAlign: 'right',
          }}
        >
          <Form.Item label=" " colon={false} className="pro-form-query-filter-actions">
            <Actions
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

const defaultWidth = isBrowser() ? document.body.clientWidth : 1024;

function QueryFilter<T = Record<string, any>>(props: QueryFilterProps<T>) {
  const {
    collapsed: controlCollapsed,
    layout,
    defaultCollapsed = true,
    defaultColsNumber,
    span,
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
    ...rest
  } = props;

  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-form-query-filter');

  const [width, setWidth] = useMountMergeState(
    () => (typeof style?.width === 'number' ? style?.width : defaultWidth) as number,
  );

  const spanSize = useMemo(() => getSpanConfig(layout, width + 16, span), [layout, width, span]);

  const showLength = useMemo(() => {
    if (defaultColsNumber !== undefined) {
      return defaultColsNumber;
    }
    return Math.max(1, 24 / spanSize.span);
  }, [defaultColsNumber, spanSize.span]);

  const labelFlexStyle = useMemo(() => {
    if (labelWidth && spanSize.layout !== 'vertical' && labelWidth !== 'auto') {
      return `0 0 ${labelWidth}px`;
    }
    return undefined;
  }, [spanSize.layout, labelWidth]);

  return (
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
        className={classNames(baseClassName, rest.className)}
        onReset={onReset}
        style={style}
        layout={spanSize.layout}
        fieldProps={{
          style: {
            width: '100%',
          },
        }}
        formItemProps={{
          labelCol: {
            flex: labelFlexStyle,
          },
          wrapperCol: {
            style: {
              maxWidth: `calc(100% - ${labelWidth}px)`,
            },
          },
          style: {
            flexWrap: 'nowrap',
          },
        }}
        groupProps={{
          titleStyle: {
            display: 'inline-block',
            marginRight: 16,
          },
        }}
        contentRender={(items, renderSubmitter, form) => (
          <QueryFilterContent
            spanSize={spanSize}
            collapsed={controlCollapsed}
            form={form}
            collapseRender={collapseRender}
            defaultCollapsed={defaultCollapsed}
            onCollapse={onCollapse}
            optionRender={optionRender}
            submitter={renderSubmitter}
            items={items}
            split={split}
            resetText={props.resetText}
            searchText={props.searchText}
            preserve={preserve}
            ignoreRules={ignoreRules}
            showLength={showLength}
          />
        )}
      />
    </RcResizeObserver>
  );
}

export default QueryFilter;
