import React from 'react';
import { Col } from 'antd';
import styles from './index.less';
import responsive from './responsive';
import { ColProps } from 'antd/es/col';

export interface DescriptionProps extends ColProps {
  column?: number;
  key?: string | number;
  style?: React.CSSProperties;
  term?: React.ReactNode;
}

const Description: React.SFC<DescriptionProps> = props => {
  const { term, column = 3, children, ...restProps } = props;
  return (
    <Col {...responsive[column]} {...restProps}>
      {term && <div className={styles.term}>{term}</div>}
      {children !== null && children !== undefined && (
        <div className={styles.detail}>{children}</div>
      )}
    </Col>
  );
};

export default Description;
