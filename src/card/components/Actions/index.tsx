import classNames from 'classnames';
import React from 'react';
import useStyle from './style';

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
  const { wrapSSR, hashId } = useStyle(prefixCls);
  if (Array.isArray(actions) && actions?.length) {
    return wrapSSR(
      <ul className={classNames(`${prefixCls}-actions`, hashId)}>
        {actions.map((action, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li
            style={{ width: `${100 / actions.length}%`, padding: 0, margin: 0 }}
            key={`action-${index}`}
            className={classNames(`${prefixCls}-actions-item`, hashId)}
          >
            {action}
          </li>
        ))}
      </ul>,
    );
  }
  return wrapSSR(
    <ul className={classNames(`${prefixCls}-actions`, hashId)}>{actions}</ul>,
  );
};

export default ProCardActions;
