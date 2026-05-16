import { ConfigProvider } from 'antd';
import { clsx } from 'clsx';
import React, { useContext } from 'react';
import { useStyle } from '../../../utils';

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

  const { hashId } = useStyle('IndexColumn', (token) => {
    const size = token.controlHeightXS + 2;
    return {
      [`.${className}`]: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        '&-border': {
          color: token.colorTextLightSolid,
          fontSize: token.fontSizeSM,
          lineHeight: 1,
          backgroundColor: token.colorTextSecondary,
          borderRadius: size / 2,
          '&.top-three': {
            backgroundColor: token.colorTextQuaternary,
          },
        },
      },
    };
  });
  return (
    <div
      ref={ref}
      className={clsx(className, hashId, {
        [`${className}-border`]: border,
        'top-three': (children as number) > 3,
      })}
    >
      {children}
    </div>
  );
};

export default React.forwardRef(IndexColumn);
