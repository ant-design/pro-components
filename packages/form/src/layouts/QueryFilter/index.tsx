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

/**
 * 获取最后一行的 offset，保证在最后一列
 * @param length
 * @param span
 */
const getOffset = (length: number, span: number = 8) => {
  const cols = 24 / span;
  return (cols - 1 - (length % cols)) * span;
};

const QueryFilter: React.FC<QueryFilterProps> = props => {
  const {
    span = defaultColConfig,
    collapsed: controlCollapsed,
    defaultCollapsed = false,
    layout,
    defaultColsNumber,
    onCollapse,
    ...rest
  } = props;
  const [formHeight, setFormHeight] = useState<number | undefined>(88);
  const [collapsed, setCollapsed] = useMergeValue<boolean>(defaultCollapsed, {
    value: controlCollapsed,
    onChange: onCollapse,
  });
  const windowSize = useMediaQuery();
  const [colSize, setColSize] = useState(getSpanConfig(span, windowSize));
  useEffect(() => {
    setColSize(getSpanConfig(span || 8, windowSize));
  }, [windowSize]);
  const rowNumber = 24 / (colSize || 3);

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
            fieldStyle={{
              width: '100%',
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
              return (
                <Row gutter={16} justify="start">
                  {showItems.map(item => (
                    <Col span={colSize}>{item}</Col>
                  ))}
                  <Col
                    span={colSize}
                    offset={getOffset(showItems.length, colSize)}
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
                        paddingTop:
                          layout === 'vertical' && showItems.length % rowNumber
                            ? 30
                            : 0,
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
