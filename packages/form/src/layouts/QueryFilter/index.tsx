/* eslint-disable no-param-reassign */
import React, { useState, ReactElement } from 'react';
import { Row, Col, Divider } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import RcResizeObserver from 'rc-resize-observer';
import { useIntl } from '@ant-design/pro-provider';

import useMergedState from 'rc-util/lib/hooks/useMergedState';
import BaseForm, { CommonFormProps } from '../../BaseForm';
import Actions, { ActionsProps } from './Actions';

const CONFIG_SPAN_BREAKPOINTS = {
  xs: 513,
  sm: 513,
  md: 785,
  lg: 1057,
  xl: 1057,
  xxl: Infinity,
};
/**
 * 配置表单列变化的容器宽度断点
 */
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
    [1062, 2, 'horizontal'],
    [1352, 3, 'horizontal'],
    [Infinity, 4, 'horizontal'],
  ],
};

/**
 * 合并用户和默认的配置
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

  labelLayout?: 'default' | 'growth' | 'vertical';
  defaultColsNumber?: number;
  labelWidth?: number | 'auto';
  split?: boolean;
  /**
   * 配置列数
   */
  span?: SpanConfig;

  /**
   * 查询按钮的文本
   */
  searchText?: string;
  /**
   * 重置按钮的文本
   */
  resetText?: string;

  form?: FormProps['form'];
  /**
   * 底部操作栏的 render
   * searchConfig 基础的配置
   * props 更加详细的配置
   * {
      type?: 'form' | 'list' | 'table' | 'cardList' | undefined;
      form: FormInstance;
      submit: () => void;
      collapse: boolean;
      setCollapse: (collapse: boolean) => void;
      showCollapseButton: boolean;
   * }
   */
  optionRender?:
    | ((
        searchConfig: Omit<BaseQueryFilterProps, 'submitter' | 'isForm'>,
        props: Omit<BaseQueryFilterProps, 'searchConfig'>,
        dom: React.ReactNode[],
      ) => React.ReactNode[])
    | false;
};

export type QueryFilterProps = FormProps &
  CommonFormProps &
  BaseQueryFilterProps & {
    onReset?: () => void;
  };

const QueryFilter: React.FC<QueryFilterProps> = (props) => {
  const {
    collapsed: controlCollapsed,
    defaultCollapsed = false,
    layout,
    defaultColsNumber,
    span,
    onReset,
    onCollapse,
    optionRender,
    labelWidth = 98,
    style,
    split,
    collapseRender,
    ...rest
  } = props;

  const intl = useIntl();

  const [collapsed, setCollapsed] = useMergedState<boolean>(() => defaultCollapsed, {
    value: controlCollapsed,
    onChange: onCollapse,
  });
  // use style.width as the defaultWidth for unit test
  const defaultWidth: number = (typeof style?.width === 'number' ? style?.width : 1024) as number;

  const [spanSize, setSpanSize] = useState<{
    span: number;
    layout: FormProps['layout'];
  }>(() => getSpanConfig(layout, defaultWidth + 16, span));

  const showLength =
    defaultColsNumber !== undefined ? defaultColsNumber : Math.max(1, 24 / spanSize.span - 1);

  let labelFlexStyle;
  if (labelWidth && spanSize.layout !== 'vertical' && labelWidth !== 'auto') {
    labelFlexStyle = `0 0 ${labelWidth}px`;
  }

  const resetText = rest.resetText || intl.getMessage('tableForm.reset', '重置');
  const searchText = rest.searchText || intl.getMessage('tableForm.search', '搜索');
  return (
    <BaseForm
      {...rest}
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
      }}
      groupProps={{
        titleStyle: {
          display: 'inline-block',
          marginRight: 16,
        },
        titleRender: (title) => `${title}:`,
      }}
      contentRender={(items, renderSubmitter) => {
        const itemsWithInfo: {
          span: number;
          hidden: boolean;
          element: React.ReactNode;
          key: string | number;
        }[] = [];

        let submitter = renderSubmitter;
        if (submitter) {
          submitter = React.cloneElement(submitter, {
            searchConfig: {
              resetText,
              submitText: searchText,
            },
            render:
              typeof optionRender === 'function'
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
            onReset,
            ...submitter.props,
          });
        }

        // totalSpan 统计控件占的位置，计算 offset 保证查询按钮在最后一列
        let totalSpan = 0;
        let lastVisibleItemIndex = items.length - 1;
        items.forEach((item, index: number) => {
          // 如果 formItem 自己配置了 hidden，默认使用它自己的
          let hidden: boolean = (item as ReactElement<{ hidden: boolean }>)?.props?.hidden || false;
          const colSize = React.isValidElement<any>(item) ? item?.props?.colSize || 1 : 1;
          const colSpan = Math.min(spanSize.span * colSize, 24);

          if ((collapsed && index >= showLength) || hidden) {
            hidden = true;
          } else {
            if (24 - (totalSpan % 24) < colSpan) {
              // 如果当前行空余位置放不下，那么折行
              totalSpan += 24 - (totalSpan % 24);
            }
            totalSpan += colSpan;
            lastVisibleItemIndex = index;
          }

          itemsWithInfo.push({
            span: colSpan,
            element: item,
            key: React.isValidElement(item)
              ? item.key || `${item.props?.name || index}-${index}}`
              : index,
            hidden,
          });
        });
        // for split compute
        let currentSpan = 0;

        const defaultRender = items.length - 1 >= showLength ? undefined : false;
        return (
          <RcResizeObserver
            key="resize-observer"
            onResize={({ width }) => {
              setSpanSize(getSpanConfig(layout, width, span));
            }}
          >
            <Row gutter={16} justify="start" key="resize-observer-row">
              {itemsWithInfo.map((item, index) => {
                if (React.isValidElement(item.element) && item.hidden) {
                  return React.cloneElement(item.element, {
                    hidden: true,
                    key: item.key || index,
                  });
                }
                currentSpan += item.span;
                const colItem = (
                  <Col key={item.key} span={item.span}>
                    {item.element}
                  </Col>
                );
                if (split && currentSpan % 24 === 0 && index < lastVisibleItemIndex) {
                  return [
                    colItem,
                    <Divider key="line" style={{ marginTop: -8, marginBottom: 16 }} dashed />,
                  ];
                }
                return colItem;
              })}
              {submitter && (
                <Col
                  span={spanSize.span}
                  offset={24 - spanSize.span - (totalSpan % 24)}
                  style={{
                    textAlign: 'right',
                  }}
                >
                  <Actions
                    submitter={submitter}
                    collapsed={collapsed}
                    collapseRender={collapseRender || defaultRender}
                    {...rest}
                    setCollapsed={setCollapsed}
                    style={{
                      // 当表单是垂直布局且提交按钮不是独自在一行的情况下需要设置一个 paddingTop 使得与控件对齐
                      paddingTop: layout === 'vertical' && totalSpan % 24 ? 30 : 0,
                      // marginBottom 是为了和 FormItem 统一让下方保留一个 24px 的距离
                      marginBottom: 24,
                    }}
                  />
                </Col>
              )}
            </Row>
          </RcResizeObserver>
        );
      }}
    />
  );
};

export default QueryFilter;
