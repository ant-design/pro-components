import { useStyle } from '@ant-design/pro-utils';
import { ConfigProvider } from 'antd';
import classnames from 'classnames';
import React, { useContext } from 'react';

/**
 * 默认的 index 列容器，提供一个好看的 index
 *
 * @param param0
 */
const IndexColumn: React.ForwardRefRenderFunction<
  any,
  { border?: boolean; children: number }
> = ({ border = false, children }, ref) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const className = getPrefixCls('pro-field-index-column');

  // css
  const { wrapSSR, hashId } = useStyle('IndexColumn', () => {
    return {
      [`.${className}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '18px',
        height: '18px',
        '&-border': {
          color: '#fff',
          fontSize: '12px',
          lineHeight: '12px',
          backgroundColor: '#314659',
          borderRadius: '9px',
          '&.top-three': {
            backgroundColor: '#979797',
          },
        },
      },
    };
  });
  return wrapSSR(
    <div
      ref={ref}
      className={classnames(className, hashId, {
        [`${className}-border`]: border,
        'top-three': (children as number) > 3,
      })}
    >
      {children}
    </div>,
  );
};

export default React.forwardRef(IndexColumn);
