import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import RcResizeObserver from 'rc-resize-observer';
import useMergeValue from 'use-merge-value';
import BaseForm, { CommonFormProps } from '../../BaseForm';
import Actions from './Actions';

/**
 * 配置表单列变化的容器宽度断点
 */
const BREAKPOINTS = {
  vertical: [
    // 一列
    513,
    // 两列
    785,
    // 三列
    1062,
    // 超出变四列
  ],
  default: [
    // 一列
    513,
    // 两列
    701,
    // 三列
    1063,
    // 超出变四列
  ],
};

/**
 * 合并用户和默认的配置
 * @param layout
 * @param width
 */
const getSpanConfig = (layout: FormProps['layout'], width: number): number => {
  const breakPoint = BREAKPOINTS[layout || 'default'].findIndex(
    (item: number) => width < item + 16, // 16 = 2 * (ant-row -8px margin)
  );
  const colsInRow = breakPoint === -1 ? 4 : breakPoint + 1;
  return 24 / colsInRow;
};

export interface QueryFilterProps extends FormProps, CommonFormProps {
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  labelLayout?: 'default' | 'growth' | 'vertical';
  defaultColsNumber?: number;
  labelWidth?: number;
}

const QueryFilter: React.FC<QueryFilterProps> = (props) => {
  const {
    collapsed: controlCollapsed,
    defaultCollapsed = false,
    layout,
    defaultColsNumber,
    onCollapse,
    labelWidth,
    style,
    ...rest
  } = props;
  const [collapsed, setCollapsed] = useMergeValue<boolean>(defaultCollapsed, {
    value: controlCollapsed,
    onChange: onCollapse,
  });
  // use style.width as the defaultWidth for unit test
  const defaultWidth = typeof style?.width === 'number' ? style?.width : 1024;
  const [spanSize, setSpanSize] = useState<number>(
    getSpanConfig(layout, (defaultWidth as number) + 16),
  );
  const showLength =
    defaultColsNumber !== undefined ? defaultColsNumber : Math.max(1, 24 / spanSize - 1);

  return (
    <BaseForm
      {...rest}
      style={style}
      layout={layout}
      fieldProps={{
        style: {
          width: '100%',
        },
      }}
      formItemProps={{
        labelCol: {
          flex: labelWidth && `0 0 ${labelWidth}px`,
        },
      }}
      contentRender={(items, submitter) => {
        const itemsWithInfo: {
          span: number;
          hidden: boolean;
          element: React.ReactNode;
        }[] = [];
        // totalSpan 统计控件占的位置，计算 offset 保证查询按钮在最后一列
        let totalSpan = 0;
        items.forEach((item: React.ReactNode, index: number) => {
          let hidden: boolean = false;
          const colSize = React.isValidElement(item) ? item.props?.colSize || 1 : 1;
          const colSpan = Math.min(spanSize * colSize, 24);

          if (collapsed && index >= showLength) {
            hidden = true;
          } else {
            if (24 - (totalSpan % 24) < colSpan) {
              // 如果当前行空余位置放不下，那么折行
              totalSpan += 24 - (totalSpan % 24);
            }
            totalSpan += colSpan;
          }

          itemsWithInfo.push({
            span: colSpan,
            element: item,
            hidden,
          });
        });

        return (
          <RcResizeObserver
            onResize={({ width }) => {
              setSpanSize(getSpanConfig(layout, width));
            }}
          >
            <Row gutter={16} justify="start">
              {itemsWithInfo.map((item, index) => {
                if (React.isValidElement(item.element) && item.hidden) {
                  return React.cloneElement(item.element, {
                    hidden: true,
                    key: index,
                  });
                }
                return (
                  <Col key={index} span={item.span}>
                    {item.element}
                  </Col>
                );
              })}
              <Col
                span={spanSize}
                offset={24 - spanSize - (totalSpan % 24)}
                style={{
                  textAlign: 'right',
                }}
              >
                <Actions
                  showCollapseButton={items.length >= showLength}
                  submitter={submitter}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  style={{
                    // 当表单是垂直布局且提交按钮不是独自在一行的情况下需要设置一个 paddingTop 使得与控件对齐
                    paddingTop: layout === 'vertical' && totalSpan % 24 ? 30 : 0,
                    // marginBottom 是为了和 FormItem 统一让下方保留一个 24px 的距离
                    marginBottom: 24,
                  }}
                />
              </Col>
            </Row>
          </RcResizeObserver>
        );
      }}
    />
  );
};

export default QueryFilter;
