import React from 'react';
import './index.less';

export type ProCardActionsProps = {
  /**
   * 自定义前缀
   *
   * @ignore
   */
  prefixCls?: string;
  /** 操作按钮 */
  actions?: React.ReactNode[] | React.ReactNode;
};

const ProCardActions: React.FC<ProCardActionsProps> = (props) => {
  const { actions, prefixCls } = props;
  if (Array.isArray(actions) && actions?.length) {
    return (
      <ul className={`${prefixCls}-actions`}>
        {actions.map((action, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li style={{ width: `${100 / actions.length}%` }} key={`action-${index}`}>
            <span>{action}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (actions) return <ul className={`${prefixCls}-actions`}>{actions}</ul>;
  return null;
};

export default ProCardActions;
