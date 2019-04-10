import React from 'react';
import { connect } from 'dva';
import styles from './GridContent.less';
import { ConnectState, SettingModelState } from '../../models/connect';
interface GridContentProps {
  settings: SettingModelState;
  children: React.ReactNode;
}

const GridContent = (props: GridContentProps) => {
  const {
    settings: { contentWidth },
    children,
  } = props;
  let className = `${styles.main}`;
  if (contentWidth === 'Fixed') {
    className = `${styles.main} ${styles.wide}`;
  }
  return <div className={className}>{children}</div>;
};

export default connect(({ setting }: ConnectState) => ({
  contentWidth: setting.contentWidth,
}))(GridContent);
