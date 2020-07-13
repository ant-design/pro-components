import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import RcResizeObserver from 'rc-resize-observer';
import useMediaQuery from 'use-media-antd-query';
import FormRender from '../../FormRender';
import Submiter from './Submiter';

const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};

export interface ProFormProps extends FormProps {
  span?: number | typeof defaultColConfig;
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

const ProForm: React.FC<ProFormProps> = (props) => {
  const { span = defaultColConfig } = props;
  const [form] = Form.useForm();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [formHeight, setFormHeight] = useState<number | undefined>(88);
  const windowSize = useMediaQuery();
  const [colSize, setColSize] = useState(getSpanConfig(span, windowSize));
  useEffect(() => {
    setColSize(getSpanConfig(span || 8, windowSize));
  }, [windowSize]);
  const rowNumber = 24 / colSize || 3;

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
          <FormRender
            {...props}
            form={form}
            itemRender={(item: any) => {
              return React.cloneElement(item, {
                style: {
                  width: '100%',
                },
              });
            }}
            contentRender={(items) => {
              return (
                <Row gutter={16} justify="start">
                  {items.map((item) => (
                    <Col span={colSize}>{item}</Col>
                  ))}
                  <Col
                    span={colSize}
                    offset={getOffset(items.length, colSize)}
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <Submiter
                      showCollapseButton={items.length > rowNumber - 1}
                      form={form}
                      submit={() => {
                        // TODO
                      }}
                      collapse={collapse}
                      setCollapse={setCollapse}
                      searchConfig={{
                        searchText: '查询',
                        resetText: '重置',
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

export default ProForm;
