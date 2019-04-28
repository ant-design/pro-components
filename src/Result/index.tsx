import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import styles from './index.less';

export interface ResultProps {
  actions?: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  type: 'success' | 'error';
}

const Result: React.SFC<ResultProps> = ({
  className,
  type,
  title,
  description,
  extra,
  actions,
  ...restProps
}) => {
  const iconMap = {
    error: <Icon className={styles.error} type="close-circle" theme="filled" />,
    success: <Icon className={styles.success} type="check-circle" theme="filled" />,
  };
  const clsString = classNames(styles.result, className);
  return (
    <div className={clsString} {...restProps}>
      <div className={styles.icon}>{iconMap[type]}</div>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      {extra && <div className={styles.extra}>{extra}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};

export default Result;
