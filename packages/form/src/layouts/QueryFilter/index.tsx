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

/**
 * 合并用户和默认的配置
 * @param span
 * @param width
 */
const getSpanConfig = (layout: FormProps['layout'], width: number): number => {
  const colsInRow: number =
    (BREAKPOINTS[layout || 'default'] || BREAKPOINTS.default).findIndex(
      (item: number) => width < item,
    ) + 1 || 4;
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
    ...rest
  } = props;
  const [formHeight, setFormHeight] = useState<number | undefined>(88);
  const [collapsed, setCollapsed] = useMergeValue<boolean>(defaultCollapsed, {
    value: controlCollapsed,
    onChange: onCollapse,
  });
  const [spanSize, setSpanSize] = useState<number>(3);
  const rowNumber = 24 / spanSize;

  return (
    <div
      style={{
        height: formHeight,
      }}
    >
      <RcResizeObserver
        onResize={({ height, width }) => {
          setFormHeight(height + 24);
          setSpanSize(getSpanConfig(layout, width));
        }}
      >
        <div>
          <BaseForm
            {...rest}
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
            contentRender={(items, submiter) => {
              const itemsWithInfo: {
                span: number;
                hidden: boolean;
                element: React.ReactNode;
              }[] = [];
              // totalSpan 统计控件占的位置，计算 offset 保证查询按钮在最后一列
              let totalSpan = 0;
              items.forEach((item: React.ReactNode, index: number) => {
                let hidden: boolean = false;
                if (collapsed) {
                  if (defaultColsNumber !== undefined) {
                    if (index >= defaultColsNumber) {
                      hidden = true;
                    }
                  } else if (index >= rowNumber - 1) {
                    hidden = true;
                  }
                }
                const colSize = React.isValidElement(item) ? item.props?.colSize || 1 : 1;
                const colSpan = Math.min(spanSize * colSize, 24);
                if (!hidden) {
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
                      showCollapseButton={items.length > rowNumber - 1}
                      submiter={submiter}
                      collapsed={collapsed}
                      setCollapsed={setCollapsed}
                      style={{
                        // 当表单是垂直布局且提交按钮不是独自在一行的情况下需要设置一个 paddingTop 使得与控件对齐
                        paddingTop: layout === 'vertical' && totalSpan % 24 ? 30 : 0,
                      }}
                    />
                  </Col>
                </Row>
              );
            }}
          />
        </div>
      </RcResizeObserver>
    </div>
  );
};

export default QueryFilter;
