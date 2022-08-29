import { Col, Row } from 'antd';
import React from 'react';
import { useStyle } from './style';

type LoadingProps = {
  /** 类名 */
  className?: string;
  /** 样式属性 */
  style?: React.CSSProperties;
  /** Prefix */
  prefix?: string;
};

const Loading: React.FC<LoadingProps> = (props) => {
  const { style, prefix } = props;
  const { wrapSSR } = useStyle(prefix || 'ant-pro-card');

  return wrapSSR(
    <div className={`${prefix}-loading-content`} style={style}>
      <Row gutter={8}>
        <Col span={22}>
          <div className={`${prefix}-loading-block`} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={8}>
          <div className={`${prefix}-loading-block`} />
        </Col>
        <Col span={15}>
          <div className={`${prefix}-loading-block`} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={6}>
          <div className={`${prefix}-loading-block`} />
        </Col>
        <Col span={18}>
          <div className={`${prefix}-loading-block`} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={13}>
          <div className={`${prefix}-loading-block`} />
        </Col>
        <Col span={9}>
          <div className={`${prefix}-loading-block`} />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={4}>
          <div className={`${prefix}-loading-block`} />
        </Col>
        <Col span={3}>
          <div className={`${prefix}-loading-block`} />
        </Col>
        <Col span={16}>
          <div className={`${prefix}-loading-block`} />
        </Col>
      </Row>
    </div>,
  );
};

export default Loading;
