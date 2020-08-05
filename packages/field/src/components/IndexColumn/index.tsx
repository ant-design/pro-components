import React, { useContext } from 'react';
import classnames from 'classnames';
import { ConfigContext } from 'antd/lib/config-provider/context';
import './index.less';

/**
 * 默认的 index 列容器，提供一个好看的 index
 * @param param0
 */
const IndexColumn: React.ForwardRefRenderFunction<any, { border?: boolean; children: number }> = (
  { border = false, children },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const className = getPrefixCls('pro-field-index-column');
  return (
    <div
      ref={ref}
      className={classnames(className, {
        [`${className}-border`]: border,
        'top-three': (children as number) > 2,
      })}
    >
      {children}
    </div>
  );
};

export default React.forwardRef(IndexColumn);
