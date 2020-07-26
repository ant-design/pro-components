import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import RcResizeObserver from 'rc-resize-observer';
import useMediaQuery from 'use-media-antd-query';
import useMergeValue from 'use-merge-value';
import BaseForm, { CommonFormProps } from '../../BaseForm';
import Actions from './Actions';

const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};

export interface QueryFilterProps extends FormProps, CommonFormProps {
  span?: number | typeof defaultColConfig;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  labelLayout?: 'default' | 'growth' | 'vertical';
  defaultColsNumber?: number;
  labelWidth?: number;
}

/**
 * 合并用户和默认的配置
 * @param span
 * @param size
 */
const getSpanConfig = (
  span: number | typeof defaultColConfig,
  size: keyof typeof defaultColConfig,
): number => {
  if (typeof span === 'number') {
    return span;
  }
  const config = {
    ...defaultColConfig,
    ...span,
  };
  return config[size];
};

const QueryFilter: React.FC<QueryFilterProps> = (props) => {
  const {
    span = defaultColConfig,
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
  const windowSize = useMediaQuery();
  const [spanSize, setSpanSize] = useState(getSpanConfig(span, windowSize));
  useEffect(() => {
    setSpanSize(getSpanConfig(span || 8, windowSize));
  }, [windowSize]);
  const rowNumber = 24 / (spanSize || 3);

  return (
    <div
      style={{
        height: formHeight,
      }}
    >
      <RcResizeObserver
        onResize={({ height }) => {
          setFormHeight(height + 24);
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
              const showItems = collapsed
                ? items.filter((_, index) => {
                    if (defaultColsNumber !== undefined) {
                      return index < defaultColsNumber;
                    }
                    return index < rowNumber - 1;
                  })
                : items;

              // totalSpan 统计控件占的位置，计算 offset 保证查询按钮在最后一列
              let totalSpan = 0;
              return (
                <Row gutter={16} justify="start">
                  {showItems.map((item: any) => {
                    const colSize = item.props?.colSize || 1;
                    const colSpan = Math.min(spanSize * colSize, 24);
                    totalSpan += colSpan;
                    return <Col span={colSpan}>{item}</Col>;
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
                        paddingTop: layout === 'vertical' && showItems.length % rowNumber ? 30 : 0,
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
